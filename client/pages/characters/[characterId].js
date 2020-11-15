const CharacterShow = ( { character }) => {
    return <div>
        <h1>{character.name}</h1>
        <div class="card bg-dark">
          <div class="card-header">
            <h5 class="card-title">Attribute</h5>
          </div>
          <div class="card-body">
            <p>Mut: {character.coreAttributes.courage}</p>
            <p>Intuition: {character.coreAttributes.intuition}</p>
            <p>Klugheit: {character.coreAttributes.sagacity}</p>
            <p>Charisma: {character.coreAttributes.charisma}</p>
            <p>Fingerfertigkeit: {character.coreAttributes.dexterity}</p>
            <p>Gewandheit: {character.coreAttributes.agipty}</p>
            <p>Konstitution: {character.coreAttributes.constitution}</p>
            <p>Körperkraft: {character.coreAttributes.strength}</p>
          </div>
      </div>
    </div>
  };
  
  CharacterShow.getInitialProps = async(context, client) => {
    const { characterId } = context.query;
    const { data } = await client.get(`/api/characters/${characterId}`);
    return { character: data };
  };

  export default CharacterShow;
  