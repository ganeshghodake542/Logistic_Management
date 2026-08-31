import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Chocolate palette
// bg      : #FBF4EC  (warm cream)
// panel   : #FFFFFF
// text    : #2E1A0F  (dark cocoa)
// muted   : #8A6A54  (mocha)
// primary : #5C3A21  (coffee bean)
// primary-hover : #47301C
// accent  : #C17F42  (caramel)
// border  : #E4D3C1
// error   : #B3452C  (burnt sienna)

const AuthPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { login, register } = useAuth();

    const [isLogin, setIsLogin] = useState(location.pathname !== "/register");

    useEffect(() => {
        setIsLogin(location.pathname !== "/register");
    }, [location.pathname]);

    // ---- Login state ----
    const [loginData, setLoginData] = useState({ email: "", password: "", role: "" });
    const [loginError, setLoginError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLoginChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setLoginError("");
        setLoading(true);
        try {
            const loggedInUser = await login(loginData);
            if (!loggedInUser?.role) {
                throw new Error("Could not verify account role");
            }
            if (loggedInUser.role === "admin") navigate("/admin/dashboard");
            else if (loggedInUser.role === "coustomer") navigate("/coustomer/dashboard");
            else navigate("/driver/dashboard");
        } catch (error) {
            console.error("Login error:", error);
            setLoginError(error?.response?.data?.message || error.message || "Login failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // ---- Register state ----
    const [regData, setRegData] = useState({ name: "", email: "", role: "", password: "" });
    const [regError, setRegError] = useState("");
    const [regLoading, setRegLoading] = useState(false);

    const handleRegChange = (e) => {
        setRegData({ ...regData, [e.target.name]: e.target.value });
    };

    const handleRegSubmit = async (e) => {
        e.preventDefault();
        setRegError("");
        setRegLoading(true);
        try {
            await register(regData);
            navigate("/");
        } catch (error) {
            console.error("Register error:", error);
            setRegError(error?.response?.data?.message || error.message || "Registration failed. Please try again.");
        } finally {
            setRegLoading(false);
        }
    };

    const RoleToggle = ({ value, onChange }) => (
        <div className="grid grid-cols-2 gap-3">
            {["Coustomer", "Driver"].map((r) => {
                const val = r.toLowerCase();
                const active = value === val;
                return (
                    <button
                        type="button"
                        key={r}
                        onClick={() => onChange(val)}
                        className={`rounded-lg border px-3.5 py-2.5 text-sm font-medium transition ${
                            active
                                ? "border-[#5C3A21] bg-[#F1E2CF] text-[#3E2A18]"
                                : "border-[#E4D3C1] text-[#8A6A54] hover:bg-[#FBF4EC]"
                        }`}
                    >
                        {r}
                    </button>
                );
            })}
        </div>
    );

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#FBF4EC] to-[#F1E2CF] p-4">
            <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-[#E4D3C1]">
                <div className="h-1.5 w-full flex bg-gradient-to-r from-[#5C3A21] via-[#C17F42] to-[#5C3A21]" />

                <div className="relative lg:min-h-[610px]">
                    {/* ---- Forms panel: slides between left/right half on desktop ---- */}
                    <div
                        className={`w-full bg-white px-8 py-10 transition-all duration-700 ease-in-out sm:px-10 lg:absolute lg:inset-y-0 lg:z-20 lg:flex lg:w-1/2 lg:flex-col lg:justify-center lg:overflow-y-auto ${
                            isLogin ? "lg:left-0" : "lg:left-1/2"
                        }`}
                    >
                        <h1 className="text-[26px] font-bold text-[#2E1A0F]">
                            {isLogin ? "Welcome back" : "Create your account"}
                        </h1>
                        <p className="mt-1.5 pb-6 text-sm text-[#8A6A54]">
                            {isLogin
                                ? "Login to your account to continue."
                                : "Sign up to start managing shipments."}
                        </p>

                        {isLogin ? (
                            <form onSubmit={handleLoginSubmit} className="space-y-4">
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#2E1A0F]">Email</label>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        value={loginData.email}
                                        onChange={handleLoginChange}
                                        placeholder="you@example.com"
                                        className="w-full rounded-lg border border-[#E4D3C1] px-3.5 py-2.5 text-sm text-[#2E1A0F] placeholder-[#B8A48F] outline-none transition focus:border-[#C17F42] focus:ring-2 focus:ring-[#F1E2CF]"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#2E1A0F]">Password</label>
                                    <input
                                        name="password"
                                        type="password"
                                        required
                                        value={loginData.password}
                                        onChange={handleLoginChange}
                                        placeholder="••••••••"
                                        className="w-full rounded-lg border border-[#E4D3C1] px-3.5 py-2.5 text-sm text-[#2E1A0F] placeholder-[#B8A48F] outline-none transition focus:border-[#C17F42] focus:ring-2 focus:ring-[#F1E2CF]"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#2E1A0F]">I am a</label>
                                    <RoleToggle
                                        value={loginData.role}
                                        onChange={(val) => setLoginData({ ...loginData, role: val })}
                                    />
                                </div>

                                {loginError && (
                                    <div className="rounded-lg border border-[#E7B8A6] bg-[#FBEAE3] px-4 py-2.5 text-sm text-[#B3452C]">
                                        {loginError}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="mt-2 w-full rounded-lg bg-[#5C3A21] px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-[#5C3A21]/30 transition hover:bg-[#47301C] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {loading ? "Logging in..." : "Login"}
                                </button>

                                <p className="pt-4 text-center text-sm text-[#8A6A54] lg:hidden">
                                    Don't have an account?{" "}
                                    <button
                                        type="button"
                                        onClick={() => navigate("/register")}
                                        className="font-semibold text-[#C17F42] hover:text-[#5C3A21]"
                                    >
                                        Register
                                    </button>
                                </p>
                            </form>
                        ) : (
                            <form onSubmit={handleRegSubmit} className="space-y-4">
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#2E1A0F]">Name</label>
                                    <input
                                        name="name"
                                        type="text"
                                        required
                                        value={regData.name}
                                        onChange={handleRegChange}
                                        placeholder="Your full name"
                                        className="w-full rounded-lg border border-[#E4D3C1] px-3.5 py-2.5 text-sm text-[#2E1A0F] placeholder-[#B8A48F] outline-none transition focus:border-[#C17F42] focus:ring-2 focus:ring-[#F1E2CF]"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#2E1A0F]">Email</label>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        value={regData.email}
                                        onChange={handleRegChange}
                                        placeholder="you@example.com"
                                        className="w-full rounded-lg border border-[#E4D3C1] px-3.5 py-2.5 text-sm text-[#2E1A0F] placeholder-[#B8A48F] outline-none transition focus:border-[#C17F42] focus:ring-2 focus:ring-[#F1E2CF]"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#2E1A0F]">Password</label>
                                    <input
                                        name="password"
                                        type="password"
                                        required
                                        value={regData.password}
                                        onChange={handleRegChange}
                                        placeholder="••••••••"
                                        className="w-full rounded-lg border border-[#E4D3C1] px-3.5 py-2.5 text-sm text-[#2E1A0F] placeholder-[#B8A48F] outline-none transition focus:border-[#C17F42] focus:ring-2 focus:ring-[#F1E2CF]"
                                    />
                                </div>
                                <div>
                                    <label className="mb-1.5 block text-sm font-medium text-[#2E1A0F]">I am a</label>
                                    <RoleToggle
                                        value={regData.role}
                                        onChange={(val) => setRegData({ ...regData, role: val })}
                                    />
                                </div>

                                {regError && (
                                    <div className="rounded-lg border border-[#E7B8A6] bg-[#FBEAE3] px-4 py-2.5 text-sm text-[#B3452C]">
                                        {regError}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={regLoading}
                                    className="mt-2 w-full rounded-lg bg-[#5C3A21] px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-[#5C3A21]/30 transition hover:bg-[#47301C] disabled:cursor-not-allowed disabled:opacity-60"
                                >
                                    {regLoading ? "Creating account..." : "Register"}
                                </button>

                                <p className="pt-4 text-center text-sm text-[#8A6A54] lg:hidden">
                                    Already have an account?{" "}
                                    <button
                                        type="button"
                                        onClick={() => navigate("/login")}
                                        className="font-semibold text-[#C17F42] hover:text-[#5C3A21]"
                                    >
                                        Login
                                    </button>
                                </p>
                            </form>
                        )}
                    </div>

                    {/* ---- Overlay panel: promotional side, slides opposite the forms panel ---- */}
                    <div
                        className={`absolute inset-y-0 z-30 hidden w-1/2 items-center justify-center overflow-hidden
                        bg-gradient-to-br from-[#5C3A21] via-[#47301C] to-[#2E1A0F] text-white transition-all duration-700 ease-in-out lg:flex
                        ${isLogin ? "left-1/2" : "left-0"}`}
                    >
                        {/* decorative blobs */}
                        <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-white/10" />
                        <div className="absolute -bottom-28 -right-14 h-[420px] w-[420px] rounded-full bg-white/10" />
                        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />

                        <div className="relative z-10 max-w-sm px-10 text-center">
                            {/* Panel 1 — shown while on login */}
                            <div
                                className={`transition-all duration-500 ${
                                    isLogin ? "opacity-100 delay-300" : "pointer-events-none absolute inset-0 opacity-0"
                                }`}
                            >
                                <h2 className="mt-6 text-[28px] font-bold leading-tight">New here?</h2>
                                <p className="mt-3 text-sm leading-relaxed text-[#F1E2CF]">
                                    Create an account to book shipments, track deliveries, or
                                    sign on as a driver.
                                </p>
                                <button
                                    onClick={() => navigate("/register")}
                                    className="mt-8 rounded-lg border-2 border-white px-7 py-2.5 text-sm font-semibold transition hover:bg-white hover:text-[#5C3A21]"
                                >
                                    Create Account
                                </button>
                            </div>

                            {/* Panel 2 — shown while on register */}
                            <div
                                className={`transition-all duration-500 ${
                                    !isLogin ? "opacity-100 delay-300" : "pointer-events-none absolute inset-0 opacity-0"
                                }`}
                            >
                                <h2 className="mt-6 text-[28px] font-bold leading-tight">Already a member?</h2>
                                <p className="mt-3 text-sm leading-relaxed text-[#F1E2CF]">
                                    Login to continue tracking your shipments or manage your
                                    fleet and routes.
                                </p>
                                <button
                                    onClick={() => navigate("/login")}
                                    className="mt-8 rounded-lg border-2 border-white px-7 py-2.5 text-sm font-semibold transition hover:bg-white hover:text-[#5C3A21]"
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;