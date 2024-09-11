import { Link, Head } from '@inertiajs/react';
import bannerImage from '../../assets/images/banners/banner-home.svg';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="relative bg-white min-h-screen overflow-hidden">

                <div
                    className="absolute inset-0 w-full h-full"
                    style={{
                        backgroundImage: `url(${bannerImage})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />

                <header className="absolute top-0 right-0 w-full flex justify-end p-6 z-10">
                    <nav className="space-x-4">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="rounded-md px-4 py-2 text-white bg-black bg-opacity-50 ring-1 ring-transparent transition hover:bg-opacity-70 focus:outline-none focus-visible:ring-[#FF2D20]"
                            >
                                Painel de controle
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="rounded-md px-4 py-2 text-white bg-black bg-opacity-50 ring-1 ring-transparent transition hover:bg-opacity-70 focus:outline-none focus-visible:ring-[#FF2D20]"
                                >
                                    Login
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="rounded-md px-4 py-2 text-white bg-black bg-opacity-50 ring-1 ring-transparent transition hover:bg-opacity-70 focus:outline-none focus-visible:ring-[#FF2D20]"
                                >
                                    Registre-se
                                </Link>
                            </>
                        )}
                    </nav>
                </header>
            </div>
        </>
    );
}
