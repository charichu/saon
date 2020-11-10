import { Character } from '../character';

it('implements optimistic concurrency control', async (done) => {
  // Create an instance of a character
  const character = Character.build({
    name: 'Alrik',
    stats: 'KK: 15',
    userId: '123',
  });

  // Save the character to the database
  await character.save();

  // fetch the character twice
  const firstInstance = await Character.findById(character.id);
  const secondInstance = await Character.findById(character.id);

  // make two separate changes to the characters we fetched
  firstInstance!.set({ stats: 'KK: 16' });
  secondInstance!.set({ stats: 'KK: 17' });

  // save the first fetched character
  await firstInstance!.save();

  // save the second fetched character and expect an error
  try {
    await secondInstance!.save();
  } catch (err) {
    return done();
  }

  throw new Error('Should not reach this point');
});


it('increments the version number on multiple saves', async () => {
    const character = Character.build({
        name: 'Balrik',
        stats: 'MU: 12',
        userId: '1234'
    });

    await character.save();
    expect(character.version).toEqual(0);
    await character.save();
    expect(character.version).toEqual(1);
    await character.save();
    expect(character.version).toEqual(2);
})