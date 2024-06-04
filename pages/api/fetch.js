const exec = require("child_process").exec;

const handler = (req, res) => {
  const child = exec("ping -c 2 google.com", function (error, stdout, stderr) {
    console.log("stdout: " + stdout);
    console.log("stderr: " + stderr);
    if (error !== null) {
      console.log("exec error: " + error);
      child.kill();
      res.status(500).json({ error: error, statusCode: 500 });
    } else {
      const isIncludeTTL = stdout.includes("ttl=");
      res.status(200).json({ status: isIncludeTTL });
    }
  });

  child.on("exit", function (code) {
    console.log("Child process exited with exit code " + code);
  });
};
export default handler;
