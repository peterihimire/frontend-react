import React from "react";
import "./PropertyForm.css";

function ValidationMessage(props) {
  if (!props.valid) {
    return <div className="error-msg">{props.message}</div>;
  }
  return null;
}

class UpdateImagePage extends React.Component {
  constructor(props) {
    super(props);
    this.fileInputRef = React.createRef();
    // GETTING THE PROPERTY ID VIA PAGE-URL-PARAMS
    let propertyId = props.match.params.propertyId;
    console.log(propertyId);

    this.state = {
      property: {},

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
      fetch(`${process.env.REACT_APP_BACKEND_URL}/properties/${propertyId} `)
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
                image: res.property.image || "",
                preview: `${process.env.REACT_APP_ASSET_URL}/${res.property.image}`,
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
    const { imageValid } = this.state;
    this.setState({
      formValid: imageValid,
    });
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

  imageSubmitHandler = (e) => {
    e.preventDefault();
    // GETTING THE PROPERTY ID VIA PAGE-URL-PARAMS
    let propertyId = this.props.match.params.propertyId;

    const data = {
      image: this.state.image,
    }; // Sending this to the backend

    const formData = new FormData();
    formData.append("image", this.state.image);

    fetch(`${process.env.REACT_APP_BACKEND_URL}/admin/properties/${propertyId}`, {
      method: "PATCH",
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
            this.props.history.push("/properties/" + propertyId);
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
    // let propertyId = this.props.match.params.propertyId;
    return (
      <div>
        <div className="">
          <h4>Updated Image</h4>

          <form action="#" id="js-form" onSubmit={this.imageSubmitHandler}>
            <div className="form-group">
              <label htmlFor="image">image</label>

              <ValidationMessage
                valid={this.state.completionValid}
                message={this.state.errorMsg.completion}
              />
              {this.state.preview ? (
                <div className="preview-img">
                  <img
                    src={this.state.preview}
                    alt='preview'
                    onClick={() => {
                      this.setState({ image: "", preview: null });
                    }}
                  />
                </div>
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
                Update Image
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default UpdateImagePage;
