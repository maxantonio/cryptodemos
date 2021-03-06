const TaniCoin = artifacts.require('TaniCoin');

require('chai')
    .use(require('chai-as-promised'))
    .should();

function tokens(n) {
    return web3.utils.toWei(n, 'ether');
}

contract('TaniCoin', (accounts) => {
    let taniCoin;

    before(async () => {
        // Load Contracts
        taniCoin = await TaniCoin.new()
    });

    describe('TaniCoin deployment', async () => {
        it('has a name', async () => {
            const name = await taniCoin.name();
            assert.equal(name, 'Tani Coin');
        });

        it('contract has tokens', async () => {
            let balance = await taniCoin.balanceOf(accounts[0]);
            assert.equal(balance.toString(), tokens('1000000'));
        });

        it('make the transfer and subtract 5%', async () => {
            await taniCoin.approve(accounts[0], tokens('100'));
            await taniCoin.transferFrom(accounts[0], accounts[1], tokens('100'));
            let send_balance = await taniCoin.balanceOf(accounts[1]);
            let profit_balance = await taniCoin.balanceOf(accounts[3]);
            assert.equal(send_balance.toString(), tokens('95'));
            assert.equal(profit_balance.toString(), tokens('5'));
        });
    })

});
