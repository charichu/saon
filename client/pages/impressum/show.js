const showImpressum = ({ currentUser, characters }) => {
    return (
        <div>
            <h1 className="adsimple-321231218">Impressum</h1>
            <p className="adsimple-321231218">Informationspflicht laut § 5 TMG.</p>
            <p className="adsimple-321231218">
                David Vennemeier
            </p>
            <p className="adsimple-321231218">33649 Bielefeld, Deutschland</p>
            <p className="adsimple-321231218">
            <strong>E-Mail:</strong> <a href="mailto:david.vennemeier@gmail.com">david.vennemeier@gmail.com</a>
            </p>
        </div>
    );
  }
    
showImpressum.getInitialProps = async (context, client, currentUser) => {
    return {}
};
    
export default showImpressum;