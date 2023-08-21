import React from "react";

const Home = () => {
  return (
    <>
      <div className="container">
        <h2>Add A NOte</h2>
        <form className="my-4">
          <div class="form-group">
            <label for="exampleFormControlInput1">Email address</label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="name@example.com"
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Example textarea</label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
            ></textarea>
          </div>
        </form>
      </div>

      <div className="container my-4">
        <h2>Your NOte</h2>
      </div>
    </>
  );
};

export default Home;
