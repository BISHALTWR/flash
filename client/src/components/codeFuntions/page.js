const Run = async (value) => {
  // return(JSON.stringify(value));
  console.log(value);
  try {
    const response = await fetch("http://localhost:4000/executeJS/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        user_id: "fake_id",
        code: value,
      }),
    });
    const data = await response.json();
    if (response.status == 200) {
      console.log(data.output);
      return data.output;
    } else if (response.status == 500) {
      console.log(data.err);
      return data.err;
    }
  } catch (err) {
    console.log(err);
    return err;
  }
};

const Save = async (value, file_name, user_id) => {
  try {
    if (!file_name) {
      console.log("Please enter a file name.");
      return;
    }

    const response = await fetch(`http://localhost:4000/saveCode/`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        user_id: user_id,
        file_name: file_name,
        code: value,
      }),
    });
    const data = await response.json();
    console.log(data, response);
  } catch (err) {
    console.log(err);
  }
};

const fetchFileNames = async (user_id) => {
  try {
    console.log("Userid is ", user_id);
    const response = await fetch(
      `http://localhost:4000/getFileNames/${user_id}`,
    );
    if (response.ok) {
      // This is nice. If response is 200-299(inclusive)
      const data = await response.json();
      console.log(data.fileNames);
      return data.fileNames;
    } else {
      console.error("Couldn't get fileNames");
      return error;
    }
  } catch (error) {
    console.error("Error fetching filenames: ", error);
    return error;
  }
};

const fetchCode = async (fileName, user_id) => {
  try {
    const response = await fetch(
      `http://localhost:4000/getCode/${user_id}/${fileName}`,
    );
    if (response.ok) {
      const data = await response.json();
      console.log(data.code.code);
      return data.code.code;
    } else {
      console.error(`Couldn't get code for ${fileName}`);
      return null;
    }
  } catch (error) {
    console.error("Error fetching code: ", error);
    return error;
  }
};

const fetchCodeInRange = async (fileNames, start, end, user_id) => {
  try {
    console.log(fileNames, "are the files");
    const fileNamesInRange = fileNames.slice(start - 1, end); // for 0 indexing
    const codePromises = fileNamesInRange.map((fileName) =>
      fetchCode(fileName, user_id),
    );
    const codes = await Promise.all(codePromises);
    console.log("Codes: ", codes);
    return codes;
  } catch (error) {
    console.error("Error fetching files in range: ", error);
    return [];
  }
};

export { Run, Save, fetchFileNames, fetchCode, fetchCodeInRange };
