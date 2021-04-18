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
      property: {},
      name: "",
      nameValid: true,
      slug: "",
      slugValid: true,
      location: "",
      locationValid: true,
      amount: "",
      amountValid: true,
      completion: "",
      completionValid: true,
      description: "",
      descriptionValid: true,
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
    console.log(this.context)
    const fetchProperty = () => {
      fetch(`http://localhost:4000/api/admin/users/${this.context.userId} `)
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
                // property: res.property,
                // name: res.property.name || "",
                // slug: res.property.slug || "",
                // location: res.property.location || "",
                // amount: res.property.amount || "",
                // completion: res.property.completion || "",
                // description: res.property.description || "",
                // image: res.property.image || "",
                // preview: `http://localhost:4000/${res.property.image}`,
              });
              let property = res.property;
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
    const {
      nameValid,
      slugValid,
      locationValid,
      amountValid,
      completionValid,
      descriptionValid,
      imageValid,
    } = this.state;
    this.setState({
      formValid:
        nameValid &&
        slugValid &&
        locationValid &&
        amountValid &&
        completionValid &&
        descriptionValid &&
        imageValid,
    });
  };

  // VALIDITY FOR NAME
  updateName = (name) => {
    this.setState({ name }, this.validateName);
  };

  validateName = () => {
    console.log(this.state);
    const { name } = this.state.property;
    console.log(name);
    let nameValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (name.length < 3) {
      nameValid = false;
      errorMsg.name = "Must be at least 3 characters long";
    }

    this.setState({ nameValid, errorMsg }, this.validateForm);
  };

  // VALIDITY FOR SLUG
  updateSlug = (slug) => {
    this.setState({ slug }, this.validateSlug);
  };

  validateSlug = () => {
    const { slug } = this.state.property;
    let slugValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (slug.length < 3) {
      slugValid = false;
      errorMsg.slug = "Must be at least 3 characters long";
    }

    this.setState({ slugValid, errorMsg }, this.validateForm);
  };

  // VALIDITY FOR LOCATION
  updateLocation = (location) => {
    this.setState({ location }, this.validateLocation);
  };

  validateLocation = () => {
    const { location } = this.state.property;
    let locationValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (location.length < 3) {
      locationValid = false;
      errorMsg.location = "Must be at least 3 characters long";
    }

    this.setState({ locationValid, errorMsg }, this.validateForm);
  };

  // VALIDITY FOR AMOUNT
  updateAmount = (amount) => {
    this.setState({ amount }, this.validateAmount);
  };

  validateAmount = () => {
    const { amount } = this.state.property;
    let amountValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (amount.length < 3) {
      amountValid = false;
      errorMsg.amount = "Must be at least 3 characters long";
    }

    this.setState({ amountValid, errorMsg }, this.validateForm);
  };

  // VALIDITY FOR COMPLETION
  updateCompletion = (completion) => {
    this.setState({ completion }, this.validateCompletion);
  };

  validateCompletion = () => {
    const { completion } = this.state;
    let completionValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (completion.length < 3) {
      completionValid = false;
      errorMsg.completion = "Must be at least 3 characters long";
    }

    this.setState({ completionValid, errorMsg }, this.validateForm);
  };

  // VALIDITY FOR DESCRIPTION
  updateDescription = (description) => {
    this.setState({ description }, this.validateDescription);
  };

  validateDescription = () => {
    const { description } = this.state.property;
    let descriptionValid = true;
    let errorMsg = { ...this.state.errorMsg };

    if (description.length < 3) {
      descriptionValid = false;
      errorMsg.description = "Must be at least 3 characters long";
    }

    this.setState({ descriptionValid, errorMsg }, this.validateForm);
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
    let propertyId = this.props.match.params.propertyId;

    const data = {
      name: this.state.name,
      slug: this.state.slug,
      location: this.state.location,
      amount: this.state.amount,
      completion: this.state.completion,
      description: this.state.description,
      image: this.state.image,
    }; // Sending this to the backend

    const formData = new FormData();
    formData.append("name", this.state.name);
    formData.append("slug", this.state.slug);
    formData.append("location", this.state.location);
    formData.append("amount", this.state.amount);
    formData.append("completion", this.state.completion);
    formData.append("description", this.state.description);
    // formData.append("image", this.state.image);

    fetch(`http://localhost:4000/api/admin/properties/${propertyId}`, {
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
            this.props.history.push("/properties");
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
    console.log(typeof `http://localhost:4000/${this.state.image}`);
    let propertyId = this.props.match.params.propertyId;
    return (
      <div>
        <div className="App">
          <h4>Updated Property Form</h4>

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
              <label htmlFor="slug">slug</label>
              <ValidationMessage
                valid={this.state.slugValid}
                message={this.state.errorMsg.slug}
              />
              <input
                type="text"
                id="slug"
                name="slug"
                className="form-field"
                value={this.state.slug || ""}
                onChange={(e) => this.updateSlug(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="location">location</label>
              <ValidationMessage
                valid={this.state.locationValid}
                message={this.state.errorMsg.location}
              />
              <input
                type="text"
                id="location"
                name="location"
                className="form-field"
                value={this.state.location || ""}
                onChange={(e) => this.updateLocation(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="amount">amount</label>
              <ValidationMessage
                valid={this.state.amountValid}
                message={this.state.errorMsg.amount}
              />
              <input
                type="text"
                id="amount"
                name="amount"
                className="form-field"
                value={this.state.amount || ""}
                onChange={(e) => this.updateAmount(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="completion">completion</label>
              <ValidationMessage
                valid={this.state.completionValid}
                message={this.state.errorMsg.completion}
              />
              <input
                type="text"
                id="completion"
                name="completion"
                className="form-field"
                value={this.state.completion || ""}
                onChange={(e) => this.updateCompletion(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">description</label>
              <ValidationMessage
                valid={this.state.descriptionValid}
                message={this.state.errorMsg.description}
              />
              <textarea
                type="text"
                id="description"
                name="description"
                rows="8"
                className="form-field-2"
                value={this.state.description || ""}
                onChange={(e) => this.updateDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="form-group">
              <label htmlFor="image">image</label>

              <ValidationMessage
                valid={this.state.completionValid}
                message={this.state.errorMsg.completion}
              />
              {this.state.preview ? (
                <Link to={`/update-image/${propertyId}`} className="">
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

            {/* <div className="form-group">
              <label htmlFor="image">image</label>

              <ValidationMessage
                valid={this.state.completionValid}
                message={this.state.errorMsg.completion}
              />
              {this.state.preview ? (
                <Link to="/update-image" className="">
                  <div className="preview-img">
                    <img
                      src={this.state.preview}
                      onClick={() => {
                        this.setState({ image: "", preview: null });
                      }}
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
            </div> */}

            <div className="form-controls">
              <button
                className="button"
                type="submit"
                disabled={!this.state.formValid}
              >
                Add Property
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UpdatePropertiesPage;
