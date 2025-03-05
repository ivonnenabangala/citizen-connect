const core= require('@actions/core') 
const exec= require('@actions/exec')

function run(){

    const bucketName = core.getInput('bucketName', {required:true})
    const bucketRegion = core.getInput('bucketRegion', {required:true})
    const distFiles = core.getInput('distFiles', {required:true})

    // upload
    const s3Url= `s3://${bucketName}`
    exec.exec(` aws s3 sync ${distFiles} ${s3Url} --region ${bucketRegion}`)
    
   const websiteURL = `http://${bucketName}.s3-website-${bucketRegion}.amazonaws.com`
   core.setOutput("URL", websiteURL)
}

run()