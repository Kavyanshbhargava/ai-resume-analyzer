import { useEffect } from "react";
import { usePuterStore } from "~/lib/puter";
import { useLocation, useNavigate } from "react-router-dom";

export const meta = () => [
    { title: "Resumind | Auth" },
    { name: "description", content: "Log into your account" },
];

const Auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const navigate = useNavigate();

    const searchParams = new URLSearchParams(location.search);
    const next = searchParams.get("next") || "/";

    // Redirect to auth page if not logged in (but avoid loop)
    useEffect(() => {
        if (auth.isAuthenticated && location.pathname !== "/auth") {
            navigate(`/auth?next=${encodeURIComponent(location.pathname)}`);
        }
    }, [auth.isAuthenticated, location.pathname, navigate]);

    // Redirect to `next` if already logged in
    useEffect(() => {
        if (!isLoading && auth.isAuthenticated && location.pathname === "/auth") {
            navigate(next);
        }
    }, [isLoading, auth.isAuthenticated, location.pathname, next, navigate]);

    if (isLoading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full"></div>
            </main>
        );
    }

    return (
        <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
            <div className="gradient-border shadow-lg">
                <section className="flex flex-col gap-8 bg-white rounded-2xl p-10">
                    <div className="flex flex-col items-center gap-2 text-center">
                        <h1>Welcome</h1>
                        <h2>Log In To Continue Your Job Journey</h2>
                    </div>
                    <div>
                        {auth.isAuthenticated ? (
                            <button className="auth-button" onClick={auth.signOut}>
                                <p>Log Out</p>
                            </button>
                        ) : (
                            <button className="auth-button" onClick={auth.signIn}>
                                <p>Log in</p>
                            </button>
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
};

export default Auth;
