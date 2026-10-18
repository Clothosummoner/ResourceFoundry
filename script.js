const resources = {
    wood: 0,
    stone: 0,
    sand: 0
};
let geld = 0;
const woodAmount = document.getElementById('wood-amount');
const stoneAmount = document.getElementById('stone-amount');
const sandAmount = document.getElementById('sand-amount');
const geldAmount = document.getElementById('geld-amount');

function updateResources() {
    woodAmount.textContent = resources.wood;
    stoneAmount.textContent = resources.stone;
    sandAmount.textContent = resources.sand;
    geldAmount.textContent = geld;
    
}
function collectResource(resource) {
    resources[resource]++;
    updateResources();
}

const woodCollectButton = document.getElementById('collect-wood');
woodCollectButton.addEventListener('click', function () {
    collectResource('wood');
});

const stoneCollectButton = document.getElementById('collect-stone');
stoneCollectButton.addEventListener('click', function() {
    collectResource('stone');
});
const sandCollectButton = document.getElementById('collect-sand');
sandCollectButton.addEventListener('click', function() {
    collectResource('sand');
});

const woodSellButton = document.getElementById('sell-wood');
woodSellButton.addEventListener('click', function() {
    if (resources.wood > 0) {
        resources.wood--;
        geld++;
        updateResources();
    }
});
const stoneSellButton = document.getElementById('sell-stone');
stoneSellButton.addEventListener('click', function() {
    if (resources.stone > 0) {
        resources.stone--;
        geld++;
        updateResources();
    }
});
const sandSellButton = document.getElementById('sell-sand');
sandSellButton.addEventListener('click', function() {
    if (resources.sand > 0) {
        resources.sand--;
        geld++;
        updateResources();
    }
});
