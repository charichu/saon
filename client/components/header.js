import Link from 'next/link';

const HeaderComponent = ({ currentUser}) => {
    const links = [
        !currentUser && { label: 'Sign Up', href: '/auth/signup'},
        !currentUser && { label: 'Sign In', href: '/auth/signin'},
        currentUser && { label: 'Import Character', href: '/characters/new'},
        currentUser && { label: 'Show Characters', href: '/characters/show'},
        currentUser && { label: 'Sign Out', href: '/auth/signout'},
    ]
        .filter(linkConfig => linkConfig)
        .map(({label, href}) => {
            return <li key={href} className="nav-item">
                <Link href={href}>
                <a className="nav-link">{label}</a>
                </Link>
            </li>
        });

    return (
        <nav className="navbar navbar-dark bg-dark text-white">
            <Link href="/">
                <a className="navbar-brand">saon</a>
            </Link>
            <div className="d-flex justify-content-end">
                <ul className="nav d-flex align-items-center">
                    {links}
                </ul>
            </div>
        </nav>
    );
};

export default HeaderComponent;