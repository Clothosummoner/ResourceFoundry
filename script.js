let wood = 0;
let stone = 0;
let sand = 0;
let geld = 0;
const woodAmount = document.getElementById('wood-amount');
const stoneAmount = document.getElementById('stone-amount');
const sandAmount = document.getElementById('sand-amount');
const geldAmount = document.getElementById('geld-amount');

function updateResources() {
    woodAmount.textContent = wood;
    stoneAmount.textContent = stone;
    sandAmount.textContent = sand;
    geldAmount.textContent = geld;
    
}

const woodCollectButton = document.getElementById('collect-wood');
woodCollectButton.addEventListener('click', function() {
    wood++;
    updateResources();
});
const stoneCollectButton = document.getElementById('collect-stone');
stoneCollectButton.addEventListener('click', function() {
    stone++;
    updateResources();
});
const sandCollectButton = document.getElementById('collect-sand');
sandCollectButton.addEventListener('click', function() {
    sand++;
    updateResources();
});
const woodSellButton = document.getElementById('sell-wood');
woodSellButton.addEventListener('click', function() {
    if (wood > 0) {
        wood--
        geld++;
        updateResources();
    }
});
const stoneSellButton = document.getElementById('sell-stone');
stoneSellButton.addEventListener('click', function() {
    if (stone > 0) {
        stone--
        geld++;
        updateResources();
    }
});
const sandSellButton = document.getElementById('sell-sand');
sandSellButton.addEventListener('click', function() {
    if (sand > 0) {
        sand--
        geld++;
        updateResources();
    }
});
