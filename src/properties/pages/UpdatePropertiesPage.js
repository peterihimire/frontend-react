import React from "react";
import { Link } from "react-router-dom";

function ValidationMessage(props) {
  if (!props.valid) {
    return <div className="error-msg">{props.message}</div>;
  }
  return null;
}

class UpdatePropertiesPage extends React.Component {
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

  componentDidMount() {
    // GETTING THE PROPERTY ID VIA PAGE-URL-PARAMS
    let propertyId = this.props.match.params.propertyId;
    const fetchProperty = () => {
      fetch(`${process.env.REACT_APP_BACKEND_URL}/property/${propertyId} `)
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
                property: res.property,
                name: res.property.name || "",
                slug: res.property.slug || "",
                location: res.property.location || "",
                amount: res.property.amount || "",
                completion: res.property.completion || "",
                description: res.property.description || "",
                image: res.property.image || "",
                preview: `${process.env.REACT_APP_ASSET_URL}${res.property.image}`,
              });
              let property = res.property;
              console.log(property);
              console.log(property.image);
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

    fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/properties/${propertyId}`, {
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
                Update Property
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UpdatePropertiesPage;

// import React from "react";
// // import { useParams } from "react-router-dom";
// import property1 from "../../assets/property-1.jpg";
// import property2 from "../../assets/property-2.jpg";
// import Card from "../../shared/components/UIElements/Card";

// const DUMMY_PROPERTIES = [
//   {
//     id: "p1",
//     name: "fully furnished 4-bedroom semi-detached duplex",
//     slug: "property-1",
//     description:
//       " Vasiti is the place where good people, who want to make an honest living should be. Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qu  esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deser unt utvoluptate aute id deserunt nisi. Amet minim mollit non deseruntullamco est sit aliqua dolor do amet sint. Velit officia consequatduis enim velit mollit. Exercitation veniam consequat sunt nostrud amet",
//     // images:
//     //   "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
//     images: property1,
//     location: "phase 2, lekki",
//     completion: "72 million",
//     amount: "50 million",
//   },
//   {
//     id: "p2",
//     name: "fully furnished 3-bedroom semi-detached duplex",
//     slug: "property-2",
//     description:
//       " Vasiti is the place where good people, who want to make an honest living should be. Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qu  esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deser unt utvoluptate aute id deserunt nisi. Amet minim mollit non deseruntullamco est sit aliqua dolor do amet sint. Velit officia consequatduis enim velit mollit. Exercitation veniam consequat sunt nostrud amet",
//     images: property2,
//     location: "ikota, lekki",
//     completion: "73 percent",
//     amount: "60 million",
//   },
// ];

// function ValidationMessage(props) {
//   if (!props.valid) {
//     return <div className="error-msg">{props.message}</div>;
//   }
//   return null;
// }

// class UpdatePropertiesPage extends React.Component {
//   // gets a single property based on the property id,
//   getSingleProperty = (propertyId) => {
//     const singleP = DUMMY_PROPERTIES.filter((property) => {
//       return property.id === propertyId;
//     });
//     return singleP[0];
//   };

//   constructor(props) {
//     super(props);
//     // GETTING THE PROPERTY ID VIA PAGE-URL-PARAMS
//     let propertyId = props.match.params.propertyId;
//     // console.log(propertyId);
//     const singleProp = this.getSingleProperty(propertyId);
//     // console.log(singleProp);

//     this.state = {
//       name: singleProp.name,
//       nameValid: true,
//       slug: singleProp.slug,
//       slugValid: true,
//       location: singleProp.location,
//       locationValid: true,
//       amount: singleProp.amount,
//       amountValid: true,
//       completion: singleProp.completion,
//       completionValid: true,
//       description: singleProp.description,
//       descriptionValid: true,
//       formValid: true,
//       errorMsg: {},
//     };
//   }

//   validateForm = () => {
//     const {
//       nameValid,
//       slugValid,
//       locationValid,
//       amountValid,
//       completionValid,
//       descriptionValid,
//     } = this.state;
//     this.setState({
//       formValid:
//         nameValid &&
//         slugValid &&
//         locationValid &&
//         amountValid &&
//         completionValid &&
//         descriptionValid,
//     });
//   };
//   // VALIDITY FOR NAME
//   updateName = (name) => {
//     this.setState({ name }, this.validateName);
//   };

//   validateName = () => {
//     console.log(this.getSingleProperty(this.state.propertyId));
//     let onePpty = this.getSingleProperty(this.state.propertyId);
//     console.log(onePpty);
//     const { name } = this.state;
//     let nameValid = true;
//     let errorMsg = { ...this.state.errorMsg };

//     if (name.length < 3) {
//       nameValid = false;
//       errorMsg.name = "Must be at least 3 characters long";
//     }

//     this.setState({ nameValid, errorMsg }, this.validateForm);
//   };

//   // VALIDITY FOR SLUG
//   updateSlug = (slug) => {
//     this.setState({ slug }, this.validateSlug);
//   };

//   validateSlug = () => {
//     const { slug } = this.state;
//     let slugValid = true;
//     let errorMsg = { ...this.state.errorMsg };

//     if (slug.length < 3) {
//       slugValid = false;
//       errorMsg.slug = "Must be at least 3 characters long";
//     }

//     this.setState({ slugValid, errorMsg }, this.validateForm);
//   };

//   // VALIDITY FOR LOCATION
//   updateLocation = (location) => {
//     this.setState({ location }, this.validateLocation);
//   };

//   validateLocation = () => {
//     const { location } = this.state;
//     let locationValid = true;
//     let errorMsg = { ...this.state.errorMsg };

//     if (location.length < 3) {
//       locationValid = false;
//       errorMsg.location = "Must be at least 3 characters long";
//     }

//     this.setState({ locationValid, errorMsg }, this.validateForm);
//   };

//   // VALIDITY FOR AMOUNT
//   updateAmount = (amount) => {
//     this.setState({ amount }, this.validateAmount);
//   };

//   validateAmount = () => {
//     const { amount } = this.state;
//     let amountValid = true;
//     let errorMsg = { ...this.state.errorMsg };

//     if (amount.length < 3) {
//       amountValid = false;
//       errorMsg.amount = "Must be at least 3 characters long";
//     }

//     this.setState({ amountValid, errorMsg }, this.validateForm);
//   };

//   // VALIDITY FOR COMPLETION
//   updateCompletion = (completion) => {
//     this.setState({ completion }, this.validateCompletion);
//   };

//   validateCompletion = () => {
//     const { completion } = this.state;
//     let completionValid = true;
//     let errorMsg = { ...this.state.errorMsg };

//     if (completion.length < 3) {
//       completionValid = false;
//       errorMsg.completion = "Must be at least 3 characters long";
//     }

//     this.setState({ completionValid, errorMsg }, this.validateForm);
//   };

//   // VALIDITY FOR DESCRIPTION
//   updateDescription = (description) => {
//     this.setState({ description }, this.validateDescription);
//   };

//   validateDescription = () => {
//     const { description } = this.state;
//     let descriptionValid = true;
//     let errorMsg = { ...this.state.errorMsg };

//     if (description.length < 3) {
//       descriptionValid = false;
//       errorMsg.description = "Must be at least 3 characters long";
//     }

//     this.setState({ descriptionValid, errorMsg }, this.validateForm);
//   };

//   propertySubmitHandler = (e) => {
//     e.preventDefault();

//     const data = {
//       name: this.state.name,
//       slug: this.state.slug,
//       location: this.state.location,
//       amount: this.state.amount,
//       completion: this.state.completion,
//       description: this.state.description,
//     }; // Sending this to the backend
//     console.log(data);
//   };

//   render() {
//     return (
//       <div>
//         <div className="App">
//           <h4>Updated Property Form</h4>
//           {/* <main role="main"> */}
//           <form action="#" id="js-form" onSubmit={this.propertySubmitHandler}>
//             <div className="form-group">
//               <label htmlFor="name">Name</label>
//               <ValidationMessage
//                 valid={this.state.nameValid}
//                 message={this.state.errorMsg.name}
//               />
//               <input
//                 type="text"
//                 id="name"
//                 name="name"
//                 className="form-field"
//                 value={this.state.name}
//                 onChange={(e) => this.updateName(e.target.value)}
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="slug">slug</label>
//               <ValidationMessage
//                 valid={this.state.slugValid}
//                 message={this.state.errorMsg.slug}
//               />
//               <input
//                 type="text"
//                 id="slug"
//                 name="slug"
//                 className="form-field"
//                 value={this.state.slug}
//                 onChange={(e) => this.updateSlug(e.target.value)}
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="location">location</label>
//               <ValidationMessage
//                 valid={this.state.locationValid}
//                 message={this.state.errorMsg.location}
//               />
//               <input
//                 type="text"
//                 id="location"
//                 name="location"
//                 className="form-field"
//                 value={this.state.location}
//                 onChange={(e) => this.updateLocation(e.target.value)}
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="amount">amount</label>
//               <ValidationMessage
//                 valid={this.state.amountValid}
//                 message={this.state.errorMsg.amount}
//               />
//               <input
//                 type="text"
//                 id="amount"
//                 name="amount"
//                 className="form-field"
//                 value={this.state.amount}
//                 onChange={(e) => this.updateAmount(e.target.value)}
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="completion">completion</label>
//               <ValidationMessage
//                 valid={this.state.completionValid}
//                 message={this.state.errorMsg.completion}
//               />
//               <input
//                 type="text"
//                 id="completion"
//                 name="completion"
//                 className="form-field"
//                 value={this.state.completion}
//                 onChange={(e) => this.updateCompletion(e.target.value)}
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="description">description</label>
//               <ValidationMessage
//                 valid={this.state.descriptionValid}
//                 message={this.state.errorMsg.description}
//               />
//               <textarea
//                 type="text"
//                 id="description"
//                 name="description"
//                 rows="8"
//                 className="form-field-2"
//                 value={this.state.description}
//                 onChange={(e) => this.updateDescription(e.target.value)}
//               ></textarea>
//             </div>

//             <div className="form-controls">
//               <button
//                 className="button"
//                 type="submit"
//                 disabled={!this.state.formValid}
//               >
//                 Add Property
//               </button>
//             </div>
//           </form>
//           {/* </main> */}
//         </div>
//       </div>
//     );
//   }
// }

// export default UpdatePropertiesPage;

// console.log(this.getProperty(propertyId));
// const singleProp = this.getProperty(propertyId);
// console.log(singleProp);

// console.log(this.getSingleProperty())
// .then((response) => {
//   console.log(response);
//   return response.json();
// })
// .then((response) => {
//   // setIsLoading(false);
//   console.log(response);
//   // const loadedProperties = response.properties;
//   // console.log(loadedProperties);
//   return response;
// })
// .then((response) => {
//   // console.log(response.property);
//   // console.log(response.property.name);
//   this.setState({
//     // singlePro: response.property,
//     name: response.property.name,
//     slug: response.property.slug,
//     location: response.property.location,
//     amount: response.property.amount,
//     completion: response.property.completion,
//     description: response.property.description,
//     images: response.property.images,
//   });
//   // return response.property;
// })
// .catch((err) => {
//   console.log(err);
//   // setIsLoading(false);
//   // setError(err.msg || "Something went wrong!");
// });
