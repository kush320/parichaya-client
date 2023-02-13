import React from "react";
import "./Form.css";

export default function Form() {
  return (
    <>
      <div className="wrapper2">
        <div className="main">Aplicantion form for National Identity Card</div>
        <form>
          <center>
            <h2 style={{ marginTop: "1rem" }}>Main Applicant Test Data</h2>
          </center>
          <div className="grid-container">
            <div class="grid-item">
              <div className="form-field ">
                <input
                  type="text"
                  name="First Name"
                  placeholder="First Name"
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div class="grid-item">
              <div className="form-field ">
                <input
                  type="text"
                  name="Middle Name"
                  placeholder="Middle Name"
                  autoComplete="off"
                />
              </div>
            </div>
            <div class="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="Last Name"
                  placeholder="Last Name"
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div class="grid-item">
              <div className="form-field">
                <input
                  type="date"
                  name="DOB"
                  placeholder="D.O.B"
                  autoComplete="off"
                  required
                />
              </div>
            </div>

            <div class="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="Birth Place"
                  placeholder="Birth Place"
                  autoComplete="off"
                  required
                />
              </div>
            </div>
          </div>
        </form>
        <form>
          <center>
            <h2> Additional Information</h2>
          </center>
          <div className="grid-container">
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="Gender"
                  placeholder="Gender"
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="Marital Status"
                  placeholder="Marital Status"
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="Academic Qualification"
                  placeholder="Academic Qualification"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="occupation"
                  placeholder="occupation"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="caste"
                  placeholder="Caste"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="Religion"
                  placeholder="Religion"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </form>
        <form>
          <center>
            <h2> Applicant's Permanet Address</h2>
          </center>
          <div className="grid-container">
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="tel"
                  name="m-number"
                  placeholder="Mobile Number "
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="distric"
                  placeholder="District"
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="local level"
                  placeholder="loca-level(ga.pa/na.pa)"
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="number"
                  name="Ward number"
                  placeholder="Ward Number"
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="village"
                  placeholder="Village/Tole"
                  autoComplete="off"
                  required
                />
              </div>
            </div>
          </div>
        </form>
        <form>
          <center>
            <h2> Applicant's Temporary Address</h2>
          </center>
          <div className="grid-container">
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="Gender"
                  placeholder="Gender"
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="Marital Status"
                  placeholder="Marital Status"
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="Academic Qualification"
                  placeholder="Academic Qualification"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="occupation"
                  placeholder="occupation"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="caste"
                  placeholder="Caste"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="Religion"
                  placeholder="Religion"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </form>
        <form>
          <center>
            <h2> Father's Details</h2>
          </center>
          <div className="grid-container">
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="Gender"
                  placeholder="Gender"
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="Marital Status"
                  placeholder="Marital Status"
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="Academic Qualification"
                  placeholder="Academic Qualification"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="occupation"
                  placeholder="occupation"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="caste"
                  placeholder="Caste"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="Religion"
                  placeholder="Religion"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </form>
        <form>
          <center>
            <h2> Mother's Details</h2>
          </center>
          <div className="grid-container">
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="Gender"
                  placeholder="Gender"
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="Marital Status"
                  placeholder="Marital Status"
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="Academic Qualification"
                  placeholder="Academic Qualification"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="occupation"
                  placeholder="occupation"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="caste"
                  placeholder="Caste"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="Religion"
                  placeholder="Religion"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </form>
        <form>
          <center>
            <h2> Grandfather's Details</h2>
          </center>
          <div className="grid-container">
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="Gender"
                  placeholder="Gender"
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="Marital Status"
                  placeholder="Marital Status"
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="Academic Qualification"
                  placeholder="Academic Qualification"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="occupation"
                  placeholder="occupation"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="caste"
                  placeholder="Caste"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="Religion"
                  placeholder="Religion"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </form>
        <form>
          <center>
            <h2> Grandmother's Details</h2>
          </center>
          <div className="grid-container">
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="Gender"
                  placeholder="Gender"
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="Marital Status"
                  placeholder="Marital Status"
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="Academic Qualification"
                  placeholder="Academic Qualification"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="occupation"
                  placeholder="occupation"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="caste"
                  placeholder="Caste"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="Religion"
                  placeholder="Religion"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </form>
        <form>
          <center>
            <h2> Spouse's Details</h2>
          </center>
          <div className="grid-container">
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="Gender"
                  placeholder="Gender"
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="Marital Status"
                  placeholder="Marital Status"
                  autoComplete="off"
                  required
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="Academic Qualification"
                  placeholder="Academic Qualification"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="occupation"
                  placeholder="occupation"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="caste"
                  placeholder="Caste"
                  autoComplete="off"
                />
              </div>
            </div>
            <div className="grid-item">
              <div className="form-field">
                <input
                  type="text"
                  name="Religion"
                  placeholder="Religion"
                  autoComplete="off"
                />
              </div>
            </div>
          </div>
        </form>
        <button className="btn">Submit</button>
      </div>
    </>
  );
}
