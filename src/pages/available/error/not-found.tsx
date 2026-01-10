import { Link } from "react-router-dom"

export const NotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900 flex items-center justify-center px-4 relative overflow-hidden">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-48 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-3xl"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center max-w-2xl">
                {/* 404 Large Number */}
                <div className="relative mb-8">
                    <h1 className="text-[200px] md:text-[280px] font-black leading-none">
                        <span className="bg-gradient-to-br from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-2xl">
                            404
                        </span>
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 md:w-48 md:h-48 bg-indigo-500/20 rounded-full blur-2xl animate-ping"></div>
                    </div>
                </div>

                {/* Error Message */}
                <div className="space-y-6 mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold text-white">
                        Page Not Found
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 max-w-md mx-auto leading-relaxed">
                        Oops! The page you're looking for has wandered off into the digital void. 
                        Let's get you back on track.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Link 
                        to="/"
                        className="group relative px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-indigo-500/50"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            <svg className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Home
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                    
                    <button 
                        onClick={() => window.history.back()}
                        className="px-8 py-4 bg-slate-800/50 backdrop-blur-sm text-gray-300 font-semibold rounded-xl border border-indigo-500/30 hover:bg-slate-700/50 hover:border-indigo-500/50 hover:text-white transition-all duration-300 hover:scale-105"
                    >
                        Go Back
                    </button>
                </div>

                {/* Additional Info */}
                <div className="mt-16 flex items-center justify-center gap-8 text-gray-500">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                        <span className="text-sm">Error Code: 404</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                        <span className="text-sm">Resource Not Found</span>
                    </div>
                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-20 left-10 w-20 h-20 border border-indigo-500/30 rounded-lg rotate-45 animate-bounce" style={{ animationDuration: '3s' }}></div>
            <div className="absolute bottom-20 right-10 w-16 h-16 border border-purple-500/30 rounded-full animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}></div>
            <div className="absolute top-1/3 right-20 w-12 h-12 border border-pink-500/30 rounded-lg animate-spin" style={{ animationDuration: '8s' }}></div>
        </div>
    )
}