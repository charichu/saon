import Link from 'next/link';

const FooterComponent = ({ currentUser}) => {
    return (    
        <footer className="page-footer font-small blue fixed-bottom">
            <hr></hr>
            <div className="footer-copyright text-center py-3">                
            <Link href="/impressum/show"><a>Impressum   </a></Link>
                © 2020 Copyright:
                <a> saon-beta.xyz</a><br></br>
            </div>
        </footer> 
    )
};

export default FooterComponent;