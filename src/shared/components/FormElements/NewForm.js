// // FIRST FORM SOLUTION
// import React, { Component } from "react";
// import "./NewForm.css";

// const validEmailRegex = RegExp(
//   /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
// );

// const validateForm = (errors) => {
//   let valid = true;
//   Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
//   return valid;
// };

// const countErrors = (errors) => {
//   let count = 0;
//   Object.values(errors).forEach((val) => val.length > 0 && (count = count + 1));
//   return count;
// };

// class NewForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       formValid: false,
//       errorCount: null,
//       errors: {
//         fullName: "",
//         email: "",
//         password: "",
//       },
//     };
//   }

//   handleChange = (e) => {
//     e.preventDefault();
//     // const name = e.target.name;
//     // const value = e.target.value;
//     const { name, value } = e.target;
//     let errors = this.state.errors;

//     switch (name) {
//       case "fullName":
//         errors.fullName =
//           value.length < 5 ? "Full Name must be 5 characters long!" : "";
//         break;
//       case "email":
//         errors.email = validEmailRegex.test(value) ? "" : "Email is not valid!";
//         break;
//       case "password":
//         errors.password =
//           value.length < 8 ? "Password must be 8 character long!" : "";
//         break;
//       default:
//         break;
//     }
//     this.setState({ errors, [name]: value });
//     console.log(errors);
//   };

//   handleSubmit = (e) => {
//     e.preventDefault();
//     this.setState({ formValid: validateForm(this.state.errors) });
//     this.setState({ errorCount: countErrors(this.state.errors) });
//   };

//   render() {
//     const { errors, formValid } = this.state;
//     return (
//       <div className="wrapper">
//         <div className="form-wrapper">
//           <h2>Register</h2>
//           <form onSubmit={this.handleSubmit} noValidate>
//             <div className="fullName">
//               <label htmlFor="fullName">Full Name</label>
//               <input
//                 type="text"
//                 name="fullName"
//                 onChange={this.handleChange}
//                 noValidate
//               />
//               {errors.fullName.length > 0 && (
//                 <span className="error">{errors.fullName}</span>
//               )}
//             </div>
//             <div className="email">
//               <label htmlFor="email">Email</label>
//               <input
//                 type="email"
//                 name="email"
//                 onChange={this.handleChange}
//                 noValidate
//               />
//               {errors.fullName.length > 0 && (
//                 <span className="error">{errors.email}</span>
//               )}
//             </div>
//             <div className="password">
//               <label htmlFor="password">Password</label>
//               <input
//                 type="password"
//                 name="password"
//                 onChange={this.handleChange}
//                 noValidate
//               />
//               {errors.password.length > 0 && (
//                 <span className="error">{errors.password}</span>
//               )}
//             </div>
//             {/* <div className="info">
//               <small>Password must be eight characters in length.</small>
//             </div> */}
//             <div className="submit">
//               <button type="submit">Create</button>
//             </div>
//             {this.state.errorCount !== null ? (
//               <p className="form-status">
//                 Form is {formValid ? "valid ✅" : "invalid ❌"}
//               </p>
//             ) : (
//               "Form not submitted"
//             )}
//           </form>
//         </div>
//       </div>
//     );
//   }
// }

// export default NewForm;

// // SECOND FORM SOLUTION

// import React, { Component } from "react";
// import { FormErrors } from "./FormErrors";
// import "./NewForm.css";

// class NewForm extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: "",
//       password: "",
//       formErrors: { email: "", password: "" },
//       emailValid: false,
//       passwordValid: false,
//       formValid: false,
//     };
//   }

//   handleUserInput = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     this.setState({ [name]: value }, () => {
//       this.validateField(name, value);
//     });
//   };

//   validateField(fieldName, value) {
//     let fieldValidationErrors = this.state.formErrors;
//     let emailValid = this.state.emailValid;
//     let passwordValid = this.state.passwordValid;

//     switch (fieldName) {
//       case "email":
//         emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
//         fieldValidationErrors.email = emailValid ? "" : " is invalid";
//         break;
//       case "password":
//         passwordValid = value.length >= 6;
//         fieldValidationErrors.password = passwordValid ? "" : " is too short";
//         break;
//       default:
//         break;
//     }
//     this.setState(
//       {
//         formErrors: fieldValidationErrors,
//         emailValid: emailValid,
//         passwordValid: passwordValid,
//       },
//       this.validateForm
//     );
//   }

//   validateForm() {
//     this.setState({
//       formValid: this.state.emailValid && this.state.passwordValid,
//     });
//   }

//   errorClass(error) {
//     return error.length === 0 ? "" : "has-error";
//   }

//   render() {
//     return (
//       <form className="demoForm">
//         {/* <h2>Sign up</h2> */}
//         <div className="panel panel-default">
//           <FormErrors formErrors={this.state.formErrors} />
//         </div>
//         <div
//           className={`form-group ${this.errorClass(
//             this.state.formErrors.email
//           )}`}
//         >
//           <label htmlFor="email">Email address</label>
//           <input
//             type="email"
//             required
//             className="form-control"
//             name="email"
//             placeholder="Email"
//             value={this.state.email}
//             onChange={this.handleUserInput}
//           />
//         </div>
//         <div
//           className={`form-group ${this.errorClass(
//             this.state.formErrors.password
//           )}`}
//         >
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             className="form-control"
//             name="password"
//             placeholder="Password"
//             value={this.state.password}
//             onChange={this.handleUserInput}
//           />
//         </div>
//         <button
//           type="submit"
//           className="btn btn-primary"
//           disabled={!this.state.formValid}
//         >
//           Sign up
//         </button>
//       </form>
//     );
//   }
// }

// export default NewForm;

// THIRD FORM SOLUTION

import React from "react";
import "./NewForm.css";

function ValidationMessage(props) {
  if (!props.valid) {
    return <div className="error-msg">{props.message}</div>;
  }
  return null;
}

class NewForm extends React.Component {
  state = {
    username: "",
    usernameValid: false,
    email: "",
    emailValid: false,
    password: "",
    passwordValid: false,
    passwordConfirm: "",
    passwordConfirmValid: false,
    formValid: false,
    errorMsg: {},
  };

  validateForm = () => {
    const {
      usernameValid,
      emailValid,
      passwordValid,
      passwordConfirmValid,
    } = this.state;
    this.setState({
      formValid:
        usernameValid && emailValid && passwordValid && passwordConfirmValid,
      // console.log(
      //   usernameValid,
      //   emailValid,
      //   passwordValid,
      //   passwordConfirmValid
      // ),
    });
  };

  updateUsername = (username) => {
    this.setState({ username }, this.validateUsername);
  };

  validateUsername = () => {
    const { username } = this.state;
    let usernameValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (username.length < 3) {
      usernameValid = false;
      errorMsg.username = "Must be at least 3 characters long";
    }

    this.setState({ usernameValid, errorMsg }, this.validateForm);
  };

  updateEmail = (email) => {
    this.setState({ email }, this.validateEmail);
  };

  validateEmail = () => {
    const { email } = this.state;
    let emailValid = true;
    let errorMsg = { ...this.state.errorMsg };

    // checks for format _@_._
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      emailValid = false;
      errorMsg.email = "Invalid email format";
    }

    this.setState({ emailValid, errorMsg }, this.validateForm);
  };

  updatePassword = (password) => {
    this.setState({ password }, this.validatePassword);
  };

  validatePassword = () => {
    const { password } = this.state;
    let passwordValid = true;
    let errorMsg = { ...this.state.errorMsg };

    // must be 6 chars
    // must contain a number
    // must contain a special character

    if (password.length < 6) {
      passwordValid = false;
      errorMsg.password = "Password must be at least 6 characters long";
    } else if (!/\d/.test(password)) {
      passwordValid = false;
      errorMsg.password = "Password must contain a digit";
    } else if (!/[!@#$%^&*]/.test(password)) {
      passwordValid = false;
      errorMsg.password = "Password must contain special character: !@#$%^&*";
    }

    this.setState({ passwordValid, errorMsg }, this.validateForm);
  };

  updatePasswordConfirm = (passwordConfirm) => {
    this.setState({ passwordConfirm }, this.validatePasswordConfirm);
  };

  validatePasswordConfirm = () => {
    const { passwordConfirm, password } = this.state;
    let passwordConfirmValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (password !== passwordConfirm) {
      passwordConfirmValid = false;
      errorMsg.passwordConfirm = "Passwords do not match";
    }

    this.setState({ passwordConfirmValid, errorMsg }, this.validateForm);
  };

  submitHandler = (e) => {
    e.preventDefault();
    console.log("Username:" + this.state.username);
    console.log("Email:" + this.state.email);
    console.log("Password:" + this.state.password);

    const data = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    console.log(data);
  };

  render() {
    return (
      <div className="App">
        <header>Form Validation</header>
        <main role="main">
          <form action="#" id="js-form" onSubmit={this.submitHandler}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <ValidationMessage
                valid={this.state.usernameValid}
                message={this.state.errorMsg.username}
              />
              <input
                type="text"
                id="username"
                name="username"
                className="form-field"
                value={this.state.username}
                onChange={(e) => this.updateUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <ValidationMessage
                valid={this.state.emailValid}
                message={this.state.errorMsg.email}
              />
              <input
                type="email"
                id="email"
                name="email"
                className="form-field"
                value={this.state.email}
                onChange={(e) => this.updateEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <ValidationMessage
                valid={this.state.passwordValid}
                message={this.state.errorMsg.password}
              />
              <input
                type="password"
                id="password"
                name="password"
                className="form-field"
                value={this.state.password}
                onChange={(e) => this.updatePassword(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password-confirmation">
                Password Confirmation
              </label>
              <ValidationMessage
                valid={this.state.passwordConfirmValid}
                message={this.state.errorMsg.passwordConfirm}
              />
              <input
                type="password"
                id="password-confirmation"
                name="password-confirmation"
                className="form-field"
                value={this.state.passwordConfirm}
                onChange={(e) => this.updatePasswordConfirm(e.target.value)}
              />
            </div>
            <div className="form-controls">
              <button
                className="button"
                type="submit"
                disabled={!this.state.formValid}
              >
                Sign Up
              </button>
            </div>
          </form>
        </main>
      </div>
    );
  }
}

export default NewForm;
