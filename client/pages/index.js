const LandingPage = ({ currentUser, characters }) => {
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <div>
      <h1>Welcome to saon!</h1>      
      <p>saon is web application created to get your DSA5 character from Optolith web ready!</p> 
      <p>Stay tuned, because this site will be updating regulary!</p>

      <p>Sign up, import your character and use our discord bot to roll the dice directly with your character data!</p>
      <p>We will add new features like gaining and spending your AP, updates to your character directly from your GM, and a community option for new items</p>
    </div>
  );
};
  
LandingPage.getInitialProps = async (context, client, currentUser) => {

    return {}
  };
  
  export default LandingPage;