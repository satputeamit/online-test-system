import path from "path";
import fs from "fs";
import GraphQLUpload from "apollo-server";
import { GraphQLResolverMap } from 'apollo-graphql';

const resolvers:any = {
    Upload: GraphQLUpload,
    Query: {
        hello: async () => {
            return "hello"
        },
    },
    
    Mutation: {
        uploadFile: async (_: any, {file}: any) => {
            // const input = args.input;
            const { createReadStream, fileName, mimetype, encoding } = await file
            const stream = createReadStream()
            const pathName = path.join(__dirname,`/src/files/${fileName}`)
            await stream.pipe(fs.createWriteStream(pathName))
            const url=""
            return {url}
        },
     } ,

} ;

export default resolvers;
