import { useState } from "react"; // Importing useState hook from React
import "./App.css"; // Importing the CSS file for styling
import { lowerChar, numberChar, symbolChar, upperChar } from "./data/passchar"; // Importing character sets for password generation
import { ToastContainer, toast } from "react-toastify"; // Importing ToastContainer and toast for notifications
import "react-toastify/dist/ReactToastify.css"; // Importing React Toastify CSS

function App() {
  // State variables to manage checkbox selections and password settings
  let [uppercase, setuppercase] = useState(false); // State for uppercase letters checkbox
  let [lowercase, setlowercase] = useState(false); // State for lowercase letters checkbox
  let [number, setnumber] = useState(false); // State for numbers checkbox
  let [symbols, setsymbols] = useState(false); // State for symbols checkbox
  let [passwordLen, setpasswordlen] = useState(10); // State for password length, default is 10
  let [finalpassword, setfinalPass] = useState(""); // State for the final generated password

  // Function to generate the password based on selected options
  let generatePassword = () => {
    let finalPass = ""; // Variable to hold the generated password
    let passChar = ""; // Variable to hold the possible characters for the password

    // Check if at least one option is selected
    if (uppercase || lowercase || number || symbols) {
      // Concatenate selected character sets
      if (uppercase) passChar = passChar + upperChar;
      if (lowercase) passChar = passChar + lowerChar;
      if (number) passChar = passChar + numberChar;
      if (symbols) passChar = passChar + symbolChar;

      // Validate the password length
      if (passwordLen > 20 || passwordLen < 10) {
        toast.error(
          "Password length should be greater than 10 and less than 20!",
          {
            className: "custom-toast",
          }
        );
        return; // Exit the function if the length is invalid
      }

      // Generate the password
      for (let i = 0; i < passwordLen; i++) {
        finalPass =
          finalPass +
          passChar.charAt(Math.floor(Math.random() * passChar.length));
      }
      setfinalPass(finalPass); // Set the generated password
      toast.success("Password generated successfully!", {
        className: "custom-toast",
      });
    } else {
      // Show an error message if no options are selected
      toast.error("Please select at least one checkbox!", {
        className: "custom-toast",
      });
    }
  };

  // Function to copy the generated password to the clipboard
  let copyPass = () => {
    navigator.clipboard.writeText(finalpassword); // Copy the password to clipboard
    toast.info("Password copied to clipboard!", {
      className: "custom-toast",
    });
  };

  return (
    <>
      <div className="my-container">
        <div className="textBox">
          <h1 className="mainHead">
            Create strong, <br />
            unique passwords
          </h1>
          <p>
            A powerful generator for powerful password to protect your online{" "}
            <br />
            accounts.
          </p>
        </div>

        <div className="passBox">
          <h1 className="text-center">Password Generator</h1>
          <input
            readOnly
            className="passwordInput"
            value={finalpassword}
          ></input>
          <p>
            <label>Maximum length</label>
            <input
              type="number"
              className="maxlenInput"
              max={20}
              min={10}
              value={passwordLen}
              onChange={(event) => {
                setpasswordlen(event.target.value); // Update password length state
              }}
            />
          </p>
          <p>
            <label>Include uppercase letters</label>
            <input
              type="checkbox"
              className="checkBox"
              checked={uppercase}
              onChange={() => setuppercase(!uppercase)} // Toggle uppercase letters state
            />
          </p>
          <p>
            <label>Include lowercase letters</label>
            <input
              type="checkbox"
              className="checkBox"
              checked={lowercase}
              onChange={() => setlowercase(!lowercase)} // Toggle lowercase letters state
            />
          </p>
          <p>
            <label>Include numbers</label>
            <input
              type="checkbox"
              className="checkBox"
              checked={number}
              onChange={() => setnumber(!number)} // Toggle numbers state
            />
          </p>
          <p>
            <label>Include special symbols</label>
            <input
              type="checkbox"
              className="checkBox"
              checked={symbols}
              onChange={() => setsymbols(!symbols)} // Toggle symbols state
            />
          </p>
          <div className="buttonBox">
            <button
              className="btn btn-primary btn-lg genBtn"
              onClick={generatePassword} // Call generatePassword function
            >
              Generate password
            </button>
            <button
              className="btn btn-primary btn-lg cpyBtn"
              onClick={copyPass} // Call copyPass function
            >
              Copy password
            </button>
          </div>
        </div>
      </div>
      <ToastContainer position="top-left" />{" "}
      {/* Container for toast notifications */}
    </>
  );
}

export default App; // Exporting the App component as the default export
