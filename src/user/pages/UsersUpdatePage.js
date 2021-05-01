import React from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../shared/context/auth-context";
function ValidationMessage(props) {
  if (!props.valid) {
    return <div className="error-msg">{props.message}</div>;
  }
  return null;
}

class UpdatePropertiesPage extends React.Component {
  static contextType = AuthContext;
  context = this.context;

  constructor(props) {
    super(props);
    this.fileInputRef = React.createRef();
    // GETTING THE PROPERTY ID VIA PAGE-URL-PARAMS
    let propertyId = props.match.params.propertyId;
    console.log(propertyId);

    this.state = {
      user: {},
      name: "",
      image: "",
      imageValid: true,
      preview: "",
      formValid: true,
      errorMsg: {},
    };
  }

  // const getCurrentUser = useCallback(() => {
  //   setIsLoading(true);
  //   fetch(`http://localhost:4000/api/admin/users/${auth.userId}`, {
  //     headers: {
  //       Authorization: "Bearer " + auth.token,
  //     },
  //   })
  //     .then((response) => {
  //       response
  //         .json()
  //         .then((res) => {
  //           console.log(res);
  //           if (!response.ok) {
  //             throw new Error(res.msg);
  //           }
  //           // setIsLoading(false);
  //           console.log(res);
  //           console.log(res.user);
  //           const loadedUser = res.user;
  //           setUser(loadedUser);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           // console.log(typeof err);
  //           setIsLoading(false);
  //           // setError(
  //           //   err.message || "You are not Authorized to view this page!"
  //           // );
  //         });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setIsLoading(false);
  //       // setError(err.msg || "Error occured , please try again!");
  //     });
  // }, [auth.token, auth.userId]);

  // useEffect(() => {
  //   //  THIS METHOD MAKES SURE THAT IF NO USER-ID THEN LOADING SPINNER ELSE THE METHOD WORKS, THE DEPENDENCY IS AUTH.USERID
  //   if (!auth.token) {
  //     setIsLoading(true);
  //   }
  //   getCurrentUser();
  // }, [auth.token, getCurrentUser]);

  componentDidMount() {
    // GETTING THE PROPERTY ID VIA PAGE-URL-PARAMS
    // let propertyId = this.props.match.params.propertyId;
    console.log(this.context);
    const fetchProperty = () => {
      fetch(
        `${process.env.REACT_APP_BACKEND_URL}/admin/users/${this.context.userId} `
      )
        .then((response) => {
          response
            .json()
            .then((res) => {
              console.log(res);

              if (!response.ok) {
                throw new Error(res.msg);
              }
              // this.setState({ loading: false });
              console.log(response);
              this.setState({
                user: res.user,
                name: res.user.name || "",
                image: res.user.image || "",
                preview: `${process.env.REACT_APP_ASSET_URL}/${res.user.image}`,
              });
              let property = res.user;
              console.log(property);
              // console.log(property.image);
              // return property;
              // this.props.history.push("/properties");
            })
            // .then((response) => {
            //   console.log(response);
            // })
            .catch((err) => {
              console.log(err);
              this.setState({
                error:
                  err.message || "Something went wrong , please try again...",
              });
              // this.setState({ loading: false });
            });
        })
        .catch((err) => {
          console.log(err);
          this.setState({
            error: err.message || "Something went wrong , please try again...",
          });
        });
    };
    fetchProperty();
  }

  validateForm = () => {
    const { nameValid, imageValid } = this.state;
    this.setState({
      formValid: nameValid && imageValid,
    });
  };

  // VALIDITY FOR NAME
  updateName = (name) => {
    this.setState({ name }, this.validateName);
  };

  validateName = () => {
    console.log(this.state);
    const { name } = this.state.user;
    console.log(name);
    let nameValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (name.length < 3) {
      nameValid = false;
      errorMsg.name = "Must be at least 3 characters long";
    }

    this.setState({ nameValid, errorMsg }, this.validateForm);
  };

  // VALIDITY FOR IMAGE
  updateImage = (e) => {
    console.log(e.target.files[0]);
    this.setState({ image: e.target.files[0] }, this.validateImage);
  };

  validateImage = () => {
    const { image } = this.state;
    console.log(image);
    let imageValid = true;
    let errorMsg = { ...this.state.errorMsg };
    if (!image) {
      imageValid = false;
      errorMsg.image = "Image field must not be empty";
      this.setState({ preview: null });
    }
    // The below method creates a preview of the image
    const reader = new FileReader();
    reader.onloadend = () => {
      // console.log(reader.result);
      this.setState({ preview: reader.result });
    };
    reader.readAsDataURL(image);
    this.setState({ imageValid, errorMsg }, this.validateForm);
  };

  propertySubmitHandler = (e) => {
    e.preventDefault();
    // GETTING THE PROPERTY ID VIA PAGE-URL-PARAMS
    let userId = this.props.match.params.userId;

    const data = {
      name: this.state.name,
    }; // Sending this to the backend

    const formData = new FormData();
    formData.append("name", this.state.name);

    // formData.append("image", this.state.image);

    fetch(`${process.env.REACT_APP_BACKEND_URL}/users/${userId}`, {
      method: "PUT",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body: formData,
    })
      .then((response) => {
        response
          .json()
          .then((res) => {
            console.log(res);
            if (!response.ok) {
              throw new Error(res.msg);
            }
            // this.setState({ loading: false });
            console.log(response);
            this.props.history.push("/profile");
          })
          .catch((err) => {
            console.log(err);
            this.setState({
              error:
                err.message || "Something went wrong , please try again...",
            });
            // this.setState({ loading: false });
          });
      })
      .catch((err) => {
        console.log(err);
        this.setState({
          error: err.message || "Something went wrong , please try again...",
        });
      });
    console.log(data);
  };

  render() {
    console.log(this.state);
    console.log(this.state.image);
    console.log(typeof this.state.image);
    // console.log(typeof `http://localhost:4000/${this.state.image}`);
    let userId = this.props.match.params.userId;
    return (
      <div>
        <div className="App">
          <h4>Updated User Form</h4>

          <form action="#" id="js-form" onSubmit={this.propertySubmitHandler}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <ValidationMessage
                valid={this.state.nameValid}
                message={this.state.errorMsg.name}
              />
              <input
                type="text"
                id="name"
                name="name"
                className="form-field"
                value={this.state.name || ""}
                onChange={(e) => this.updateName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">image</label>

              <ValidationMessage
                valid={this.state.completionValid}
                message={this.state.errorMsg.completion}
              />
              {this.state.preview ? (
                <Link to={`/update-user-image/${userId}`} className="">
                  <div className="preview-img">
                    <img
                      src={this.state.preview}
                      alt="preview"
                      // onClick={() => {
                      //   this.setState({ image: "", preview: null });
                      // }}
                    />
                  </div>
                </Link>
              ) : (
                <button
                  className="form-image-btn"
                  // the below function with click method launches the file input
                  onClick={(e) => {
                    e.preventDefault();
                    this.fileInputRef.current.click();
                  }}
                >
                  add image
                </button>
              )}

              <input
                type="file"
                id="image"
                name="image"
                className="form-file"
                accept=".jpg, .png, .jpeg"
                onChange={this.updateImage}
                ref={this.fileInputRef}
              />
            </div>

            <div className="form-controls">
              <button
                className="button"
                type="submit"
                disabled={!this.state.formValid}
              >
                Update Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UpdatePropertiesPage;
