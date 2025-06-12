// import { auth } from "@clerk/nextjs/server";
import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

// const handelAuth = async () => {
//     const { userId } = await auth();
//     if (!userId) throw new Error("Unauthorized");
//     return { userId };
// };


export const ourFileRouter = {
    profile: f({ image: { maxFileSize: "4MB" } })
        .middleware(async () => {
            const { userId } = await auth();
            if (!userId) throw new Error("Unauthorized");
            return { userId };
        })
        .onUploadComplete(({ metadata }) => {
            console.log("Upload complete", metadata);
        }),
} satisfies FileRouter;
export type OurFileRouter = typeof ourFileRouter;
