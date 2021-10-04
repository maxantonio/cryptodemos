const SampleString = artifacts.require("SampleString");

contract('SampleString', (accounts) => {
  it('debe tener valor inicial ', async () => {
    const sampleInstance = await SampleString.deployed();
    const value = await sampleInstance.get.call();

    assert.equal(value, "Initial Value", "El valor inicial no funciona");
  });
  it('debe dejar cambiar valor inicial y obtenerlo de vuelta', async () => {
    const sampleInstance = await SampleString.deployed();
    await sampleInstance.set("cambiando valor");
    const value = await sampleInstance.get.call();
    assert.equal(value, "cambiando valor", "El valor seteado no funciona");
  });
  //
});
