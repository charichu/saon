const showImpressum = ({ currentUser, characters }) => {
    return (
        <div>
            <h1 class="adsimple-321231218">Impressum</h1>
            <p class="adsimple-321231218">Informationspflicht laut § 5 TMG.</p>
            <p class="adsimple-321231218">
                David Vennemeier
            </p>
            <p class="adsimple-321231218">33649 Bielefeld, Deutschland</p>
            <p class="adsimple-321231218">
            <strong>E-Mail:</strong> david.vennemeier@gmail.com
            </p>
        </div>
    );
  }
    
showImpressum.getInitialProps = async (context, client, currentUser) => {
    return {}
};
    
export default showImpressum;