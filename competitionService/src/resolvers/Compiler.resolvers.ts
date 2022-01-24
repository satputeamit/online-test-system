import path from "path";
import fs from "fs";
import GraphQLUpload from "apollo-server";
import { GraphQLResolverMap } from "apollo-graphql";
import { executeCode, getExt, writeFile } from "../services/codeUtils.service";

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
            const fileName = input.user_id + "_" + input.exam_id + "_" + input.question_id + getExt(input.language);
            writeFile(fileName, input.content);
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
    },
};

export default resolvers;
