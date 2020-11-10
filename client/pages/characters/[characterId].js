const CharacterShow = ( { character }) => {
    return <div>
        <h1>{character.name}</h1>
        <h4>{character.stats}</h4>
    </div>;
  };
  
  CharacterShow.getInitialProps = async(context, client) => {
    const { characterId } = context.query;
    const { data } = await client.get(`/api/characters/${characterId}`);

    return { character: data };
  };

  export default CharacterShow;
  