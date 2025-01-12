export const riderLogout = async (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    const sameSite = isProduction ? "None" : "Lax";

    res.clearCookie("riderAccessToken", {
      httpOnly: true,
      secure: isProduction,
      sameSite: sameSite,
      path: "/",
    });

    res.clearCookie("riderRefreshToken", {
      httpOnly: true,
      secure: isProduction,
      sameSite: sameSite,
      path: "/",
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred during logout. Please try again.",
    });
  }
};
