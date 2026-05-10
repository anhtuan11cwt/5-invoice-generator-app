const API_URL = "http://localhost:8080/api/auth";

export const authService = {
  forgotPassword: async (email) => {
    const response = await fetch(`${API_URL}/forgot-password?email=${email}`, {
      method: "POST",
    });

    if (!response.ok) {
      throw new Error("Gửi email đặt lại mật khẩu thất bại");
    }

    return response.text();
  },

  login: async (credentials) => {
    const response = await fetch(`${API_URL}/login`, {
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Đăng nhập thất bại");
    }

    return response.json();
  },
  register: async (userData) => {
    const response = await fetch(`${API_URL}/register`, {
      body: JSON.stringify(userData),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const responseText = await response.text();

    if (!response.ok) {
      let errorMessage = "Đăng ký thất bại";
      try {
        const errorJson = JSON.parse(responseText);
        errorMessage = errorJson.message || errorMessage;
      } catch {
        // ignore
      }
      throw new Error(errorMessage);
    }

    if (responseText.startsWith("Đăng ký thành công")) {
      return { message: responseText };
    }

    try {
      return JSON.parse(responseText);
    } catch {
      return { message: responseText };
    }
  },

  resetPassword: async (code, newPassword) => {
    const response = await fetch(
      `${API_URL}/reset-password?code=${code}&newPassword=${newPassword}`,
      {
        method: "POST",
      },
    );

    if (!response.ok) {
      throw new Error("Đặt lại mật khẩu thất bại");
    }

    return response.text();
  },

  verifyEmail: async (code) => {
    const response = await fetch(`${API_URL}/verify?code=${code}`, {
      method: "POST",
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Xác thực thất bại");
    }

    return response.json();
  },
};
