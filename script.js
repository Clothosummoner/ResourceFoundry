const resources = {
    wood: 0,
    stone: 0,
    sand: 0
};
let money = 0;
const woodAmount = document.getElementById('wood-amount');
const stoneAmount = document.getElementById('stone-amount');
const sandAmount = document.getElementById('sand-amount');
const moneyAmount = document.getElementById('money-amount');

function updateResources() {
    woodAmount.textContent = resources.wood;
    stoneAmount.textContent = resources.stone;
    sandAmount.textContent = resources.sand;
    moneyAmount.textContent = money;

}
function collectResource(resource) {
    resources[resource]++;
    updateResources();
}
function sellResource(resource) {
    if (resources[resource] > 0) {
        resources[resource]--;
        money++;
        updateResources();
    }
}


const woodCollectButton = document.getElementById('collect-wood');
woodCollectButton.addEventListener('click', function () {
    collectResource('wood');
});

const stoneCollectButton = document.getElementById('collect-stone');
stoneCollectButton.addEventListener('click', function () {
    collectResource('stone');
});
const sandCollectButton = document.getElementById('collect-sand');
sandCollectButton.addEventListener('click', function () {
    collectResource('sand');
});

const woodSellButton = document.getElementById('sell-wood');
woodSellButton.addEventListener('click', function () {
    sellResource('wood');
});
const stoneSellButton = document.getElementById('sell-stone');
stoneSellButton.addEventListener('click', function () {
    sellResource('stone');
});
const sandSellButton = document.getElementById('sell-sand');
sandSellButton.addEventListener('click', function () {
    sellResource('sand');
});

