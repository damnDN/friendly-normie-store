import { useState } from "react";
import React from "react";

const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    eighteen: false,
  });
  const [error, setError] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate(form);
    if (!isValid) return;
    console.log(form); //data processing
  };
  const required = (e, type) => {
    e.target.value.length == 0
      ? setError((prev) => ({ ...prev, [type]: `${type} is required` }))
      : setError((prev) => ({ ...prev, [type]: undefined }));
  };
  const validate = (form) => {
    const newErrors = {};

    //  1. email
    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(form.email)) {
      newErrors.email = "Invalid email";
    }

    // 2. password length
    if (form.password.length < 8) {
      newErrors.password = "Password must have at least 8 characters";
    }

    //3. password strength: to be done
    //4. confirm password
    if (form.password !== form.confirm) {
      newErrors.confirm = "Passwords do not match";
    }
    //5. confirm age
    if (!form.eighteen) {
      newErrors.eighteen = "Must be above 18 years";
    }

    setError(newErrors);

    return Object.keys(newErrors).length === 0; //used in handleSubmit to prevent submission if validation fails
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="inline-flex flex-col bg-green-400 w-[20%] p-2 mx-auto rounded-2xl border border-green-500"
      >
        {/* NAME */}
        <label htmlFor="name">Your name</label>
        <input
          name="name"
          value={form.name}
          onBlur={(e) => {
            required(e, "name");
          }}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="outline-none border border-white"
        />
        {error.name && <div>{error.name}</div>}

        {/* EMAIL */}
        <label htmlFor="email">Your email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          onBlur={(e) => {
            required(e, "email");
          }}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="outline-none border border-white"
        />
        {error.email && <div>{error.email}</div>}

        {/* PASSWORD */}
        <label htmlFor="email">Your password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onBlur={(e) => {
            required(e, "password");
          }}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="outline-none border border-white"
        />
        {error.password && <div>{error.password}</div>}

        {/* CONFIRM PASSWORD     */}
        <label htmlFor="confirm">Confirm password</label>
        <input
          type="password"
          name="confirm"
          value={form.confirm}
          onBlur={(e) => {
            required(e, "confirm");
          }}
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
          className="outline-none border border-white"
        />
        {error.confirm && <div>{error.confirm}</div>}

        <div>
          <input
            name="age"
            checked={form.eighteen}
            type="checkbox"
            onChange={(e) => setForm({ ...form, eighteen: e.target.checked })}
            className="outline-none border border-white"
          />
          <label htmlFor="age">I am above 18</label>
          {error.eighteen && <div>{error.eighteen}</div>}{" "}
        </div>
        <input
          type="submit"
          className="px-4 bg-green-300 w-[30%] rounded-xl py-1 cursor-pointer"
        />
        <div></div>
      </form>

      <div>name: {form.name}</div>
      <div>email: {form.email}</div>
      <div>password: {form.password}</div>
      <div>checked: {String(form.eighteen)}</div>
    </>
  );
};
export default Signup;

/*
concepts learnt:
1. react state updates are asynchronous. multiple state updates in a block that depend on the current state can overwrite each other if they all read the same stale snapshot. build the state first then update it. KNEW THIS FROM THE START BUT HERE IT WAS HARD TO SPOT THIS IMPLICITLY.
2. react doesn't render booleans~ <div>checked: {true}</div> renders "checked" only. 
3. whenever next state depends on previous state, updater function should be used in setstate function BECAUSE rapid updates can still use stale state.
*/

/*
Things I can feel need improvement:
1. required() currrently duplicates validatoin logic outside validate().
2. 
*/
