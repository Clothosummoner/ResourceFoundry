const resources = {
    wood: 0,
    stone: 0,
    sand: 0
};
let money = 0;
let lumberjackCount = 0;

const woodAmount = document.getElementById('wood-amount');
const stoneAmount = document.getElementById('stone-amount');
const sandAmount = document.getElementById('sand-amount');
const moneyAmount = document.getElementById('money-amount');
const shopView = document.getElementById('shop-view');
const resourceView = document.getElementById('resource-view');
const lumberjackCost = 10; // Cost of a lumberjack in money
const lumberjackProductionRate = 1; // Amount of wood produced per second by a lumberjack
const lumberjackCountElement = document.getElementById('lumberjack-amount');


function updateResources() {
    woodAmount.textContent = resources.wood;
    stoneAmount.textContent = resources.stone;
    sandAmount.textContent = resources.sand;
    moneyAmount.textContent = money;
    lumberjackCountElement.textContent = lumberjackCount;

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

function buyLumberjack() {
    if (money >= lumberjackCost) {
        money -= lumberjackCost;
        lumberjackCount++;
        updateResources();
    }
}
function saveGame() {
    const gameState = {
        resources: resources,
        money: money,
        lumberjackCount: lumberjackCount
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
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
const buyLumberjackButton = document.getElementById('buy-lumberjack');
buyLumberjackButton.addEventListener('click', function () {
    buyLumberjack();
});

const shopButton = document.getElementById('nav-shop');
shopButton.addEventListener('click', function () {
    resourceView.style.display = 'none';
    shopView.style.display = 'block';
});
const resourceButton = document.getElementById('nav-resources');
resourceButton.addEventListener('click', function () {
    shopView.style.display = 'none';
    resourceView.style.display = 'block';
});
const saveButton = document.getElementById('save-game');
saveButton.addEventListener('click', function () {
    saveGame();
});

setInterval(function () {
    if (lumberjackCount > 0) {
        resources.wood += lumberjackCount * lumberjackProductionRate;
        updateResources();
    }
}, 1000);