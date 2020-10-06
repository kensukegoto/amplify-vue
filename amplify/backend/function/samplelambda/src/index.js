/* Amplify Params - DO NOT EDIT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const AWS = require("aws-sdk");
const S3 = new AWS.S3();

exports.handler = async (event) => {

    
    await S3.putObject({
      Bucket: "dev-goto-test",
      Key: `test.json`,
      Body: JSON.stringify({ name: "kensukegoto" }),
      ContentType: "application/json"
    }).promise()

    console.log("こんにちは");


    const response = {
        statusCode: 200,
    //  Uncomment below to enable CORS requests
     headers: {
         "Access-Control-Allow-Origin": "*"
     }, 
        body: JSON.stringify('ごとうけんすけ!'),
    };
    return response;
};
