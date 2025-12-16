import React from "react";
import Input from "../common/Input.jsx";
import Button from "../common/Button.jsx";

const LoginForm = ({ onSubmit, loading, error }) => {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = React.useState({});

  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email is invalid";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    } else if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} loading={loading} error={error}>
      <div className="space-y-6">
        <Input
          label="Email Address"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={formErrors.email}
          placeholder="you@example.com"
          autoComplete="email"
        />

        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={formErrors.password}
          placeholder="••••••••"
          autoComplete="current-password"
        />

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
            {error}
          </div>
        )}

        <Button type="submit" loading={loading} className="w-full">
          Sign In
        </Button>
      </div>
    </form>
  );
};
export default LoginForm;
