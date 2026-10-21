const resources = {
    wood: 0,
    stone: 0,
    sand: 0
};
let money = 0;
let lumberjackCount = 0;
let hasAxe = false;
let hasPickaxe = false;
let hasShovel = false;
let lumberjackProductionRate = 1; 
let quarryWorkerCount = 0; 
let quarryProductionRate = 1; 
let sandWorkerCount = 0; 
let sandProductionRate = 1; 

const woodAmount = document.getElementById('wood-amount');
const stoneAmount = document.getElementById('stone-amount');
const sandAmount = document.getElementById('sand-amount');
const moneyAmount = document.getElementById('money-amount');
const shopView = document.getElementById('shop-view');
const resourceView = document.getElementById('resource-view');
const lumberjackCost = 10; 
const lumberjackCountElement = document.getElementById('lumberjack-amount');
const quarryWorkerCost = 15; 
const quarryWorkerCountElement = document.getElementById('quarry-worker-amount');
const sandWorkerCost = 20; 
const sandWorkerCountElement = document.getElementById('sand-worker-amount');


function updateResources() {
    woodAmount.textContent = resources.wood;
    stoneAmount.textContent = resources.stone;
    sandAmount.textContent = resources.sand;
    moneyAmount.textContent = money;
    lumberjackCountElement.textContent = lumberjackCount;
    quarryWorkerCountElement.textContent = quarryWorkerCount;
    sandWorkerCountElement.textContent = sandWorkerCount;

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
function buyQuarryWorker() {
    if (money >= quarryWorkerCost) {
        money -= quarryWorkerCost;
        quarryWorkerCount++;
        updateResources();
    }
}
function buySandWorker() {
    if (money >= sandWorkerCost) {
        money -= sandWorkerCost;
        sandWorkerCount++;
        updateResources();
    }
}
function saveGame() {
    const gameState = {
        resources: resources,
        money: money,
        lumberjackCount: lumberjackCount,
        quarryWorkerCount: quarryWorkerCount,
        sandWorkerCount: sandWorkerCount
    };
    localStorage.setItem('gameState', JSON.stringify(gameState));
}
function loadGame() {
    const savedGameState = localStorage.getItem('gameState');
    if (savedGameState) {
        const gameState = JSON.parse(savedGameState);
        resources.wood = gameState.resources.wood ?? 0;
        resources.stone = gameState.resources.stone ?? 0;
        resources.sand = gameState.resources.sand ?? 0;
        money = gameState.money ?? 0;
        lumberjackCount = gameState.lumberjackCount ?? 0;
        quarryWorkerCount = gameState.quarryWorkerCount ?? 0;
        sandWorkerCount = gameState.sandWorkerCount ?? 0;
        updateResources();
    } 
}
loadGame();
function toolCheck() {
    if (hasAxe) {
        lumberjackProductionRate = 2; // Double production rate if the player has an axe
    }
}
toolCheck();

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
const buyQuarryWorkerButton = document.getElementById('buy-quarry-worker');
buyQuarryWorkerButton.addEventListener('click', function () {
    buyQuarryWorker();
});
const buySandWorkerButton = document.getElementById('buy-sand-worker');
buySandWorkerButton.addEventListener('click', function () {
    buySandWorker();
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
    if (quarryWorkerCount > 0) {
        resources.stone += quarryWorkerCount * quarryProductionRate;
        updateResources();
    }
    if (sandWorkerCount > 0) {
        resources.sand += sandWorkerCount * sandProductionRate;
        updateResources();
    }
}, 1000);
setInterval(function () {
    saveGame();
}, 10000);
