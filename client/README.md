  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/api/users/login",
  //       {
  //         username,
  //         password,
  //       }
  //     );
  //     localStorage.setItem("token", response.data.token);
  //     localStorage.setItem("userId", response.data.userId);
  //     navigate("/home");
  //   } catch (error) {
  //     if (error.response.data.error === "Invalid username or password") {
  //       setError("Invalid username or password");
  //     } else {
  //       setError(
  //         error.response.data.error ||
  //           "An error occurred during login. Try again"
  //       );
  //     }
  //   }
  // };

  