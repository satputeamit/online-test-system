import { validateAddExam, validateCandidateExamStatus } from "../helper/validator";
import CandidateExamStatus, { CandidateExamStatusInterface } from "../models/CandidateExamStatus.model";
import Exam, { ExamInterface } from "../models/ExamInfo.model";

const resolvers = {
    Query: {
        getCandidateExamStatus: async (_: any, args: any) => {
            const input = args.input;
            const examStatus = await CandidateExamStatus.findOne({ exam_id: input.exam_id, candidate_id: input.candidate_id });
            return examStatus
        },
    },
    Mutation: {
        createCandidateExamStatus: async (_: any, args: any) => {
            const input = args.input;
            const isValid = validateCandidateExamStatus(input);
            if (isValid) {
                const _cesObj = await CandidateExamStatus.findOne({ exam_id: input.exam_id, candidate_id: input.candidate_id })
                if (_cesObj) {
                    if (!_cesObj.question_ids.includes(input.question_id)) {
                        const udp = await CandidateExamStatus.updateOne(
                            { _id: _cesObj?.id },
                            { question_ids: [..._cesObj.question_ids, input.question_id] }
                        );
                    }

                    return await CandidateExamStatus.findOne({ _id: _cesObj?.id });
                }
                else {
                    const cesObj = new CandidateExamStatus({
                        exam_id: input.exam_id,
                        candidate_id: input.candidate_id,
                    });
                    cesObj.question_ids.push(input.question_id)
                    return await cesObj.save()
                }


                // return await CandidateExamStatus.create(input);
            }
            throw new Error("Invalid Request");
        },

        updateCandidateExamStatus: async (_: any, args: any) => {
            const input = args.input;
            const _cesObj = await CandidateExamStatus.findOne({ exam_id: input.exam_id, candidate_id: input.candidate_id })
            if (_cesObj) {
                const udp = await CandidateExamStatus.updateOne(
                    { _id: _cesObj?.id },
                    { exam_status:input.exam_status }
                );

                return "Exam status updated"

            }
            return "Not Found"

        }
    },

    CandidateExamStatus: {
        async __resolveReference(cd: CandidateExamStatusInterface) {
            return CandidateExamStatus.findOne(cd.id);
        },
    },
};

export default resolvers;
