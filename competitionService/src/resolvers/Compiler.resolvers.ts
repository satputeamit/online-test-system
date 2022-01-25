import path from "path";
import fs from "fs";
import GraphQLUpload from "apollo-server";
import { GraphQLResolverMap } from "apollo-graphql";
import {
    executeCode,
    getExt,
    writeFile,
    writeFinalFile,
} from "../services/codeUtils.service";
import QuesAns, { QuesAnsInterface } from "../models/QuesAns.model";
import Result from "../models/Result.model";

const resolvers: any = {
    Upload: GraphQLUpload,
    Query: {
        hello: async () => {
            return "hello";
        },
    },

    Mutation: {
        uploadFile: async (_: any, { file }: any) => {
            // const input = args.input;
            const { createReadStream, fileName, mimetype, encoding } = await file;
            const stream = createReadStream();
            const pathName = path.join(__dirname, `/src/files/${fileName}`);
            await stream.pipe(fs.createWriteStream(pathName));
            const url = "";
            return { url };
        },
        codeExec: async (_: any, args: any) => {
            const input = args.input;
            const fileName =
                input.user_id +
                "_" +
                input.exam_id +
                "_" +
                input.question_id +
                getExt(input.language);
            writeFile(fileName, input.content);
            // writeFinalFile(fileName, input.content)
            try {
                var exeoutput = await executeCode(fileName);
                // executeCode(input.content)
                return {
                    stdout: exeoutput.stdout,
                    stderr: exeoutput.stderr,
                };
            } catch (err) {
                return {
                    stdout: "",
                    stderr: JSON.stringify(err),
                };
            }
        },
        codeSubmit: async (_: any, args: any) => {
            const input = args.input;
            const fileName =
                input.user_id +
                "_" +
                input.exam_id +
                "_" +
                input.question_id +
                getExt(input.language);
            const ques = await QuesAns.findOne({ _id: input.question_id });
            const ques_inputs = ques?.inputs || [];
            const ques_outputs = ques?.outputs || [];
            console.log(ques_inputs)
            console.log(ques_outputs)
            writeFinalFile(fileName, input.content);
            try {
                var testOp: any = [];
                var answerStatus = 0;
                for (let i = 0; i < ques_inputs?.length; i++) {
                    var exeoutput = await executeCode(
                        `ff_${fileName} "${ques_inputs[i]}"`
                    );
                    testOp.push(exeoutput.stdout.trim());
                }
                console.log(testOp)
                if (JSON.stringify(testOp) === JSON.stringify(ques_outputs)) {
                    answerStatus = 1

                } else {
                    answerStatus = 0
                }

                // result
                const resultObj = await Result.findOne({ exam_id: input.exam_id, candidate_id: input.user_id })
                console.log("resultObj:", resultObj?.id)
                if (resultObj) {
                    console.log("rseult ques:", resultObj.question_status)
                    const doc = resultObj.question_status.find(({ question_id }) => question_id === input.question_id)
                    console.log("doc:",doc)
                    if (doc) {
                        doc.status = answerStatus;
                        console.log("rseult ques insde:", resultObj.question_status)
                        console.log("doc inside:",doc)
                        const udp = await Result.updateOne(
                            { _id: resultObj?.id },
                            {question_status:resultObj.question_status}
                        );
                        console.log("updated:",udp)
                    }
                    else {
                        console.log("in else")
                        var newData ={
                            question_status: [...resultObj.question_status, {
                                question_id: input.question_id,
                                status: answerStatus
                            }
                            ]
                        }
                        console.log("new Data:", newData)
                        await Result.updateOne(
                            { _id: resultObj?.id },
                            newData
                        );
                    }
                }
                else {
                    console.log("new reuslt created")
                    await Result.create({
                        exam_id: input.exam_id,
                        candidate_id: input.user_id,
                        question_status: [{
                            question_id:input.question_id,
                            status:answerStatus
                        }]
                    })
                }

                //

                return true;
            } catch (err) {
                console.log(err)
                return false;
            }
        },
    },
};

export default resolvers;
