import { GetObjectCommand, PutObjectCommand, S3 } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto"

const config = {
  region: process.env.S3_REGION,
  credentials: {
    accessKeyId: process.env.AWS_KEY ?? "",
    secretAccessKey: process.env.AWS_SECRET ?? "",
  },
};
const s3 = new S3(config);

export const generateUploadURL = async (originalName: string) => {
  console.log("=--------------enterd the func ----------")
  const fileName = crypto.randomUUID() + originalName;
  // const fileName =  originalName;
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: fileName,
  };
  const command = new PutObjectCommand(params);
  const URL = await getSignedUrl(s3, command, {
    expiresIn: 60 * 5,
  });
  return URL;
};
