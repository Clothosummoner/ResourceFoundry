const resources = {
    wood: 0,
    stone: 0,
    sand: 0
};
const sellPrices = {
    wood: 1,
    stone: 2,
    sand: 3
};
const worker = {
    lumberjack: {
        count: 0,
        baseCost: 10,
        productionRate: 1
    },
    quarryWorker: {
        count: 0,
        baseCost: 20,
        productionRate: 1
    },
    sandWorker: {
        count: 0,
        baseCost: 30,
        productionRate: 1
    }
};
let money = 0;
let sellAmount = 1;
let hasAxe = false;
let hasPickaxe = false;
let hasShovel = false;
const woodAmount = document.getElementById('wood-amount');
const stoneAmount = document.getElementById('stone-amount');
const sandAmount = document.getElementById('sand-amount');
const moneyAmount = document.getElementById('money-amount');
const shopView = document.getElementById('shop-view');
const resourceView = document.getElementById('resource-view');
const lumberjackCountElement = document.getElementById('lumberjack-amount');
const quarryWorkerCountElement = document.getElementById('quarry-worker-amount'); 
const sandWorkerCountElement = document.getElementById('sand-worker-amount');
const lumberjackCostElement = document.getElementById('lumberjack-cost');
const quarryWorkerCostElement = document.getElementById('quarry-worker-cost');
const sandWorkerCostElement = document.getElementById('sand-worker-cost');
const axeCost = 50; // Cost of the axe
const axeStatusElement = document.getElementById('axe-amount');
const pickaxeCost = 75; // Cost of the pickaxe
const pickaxeStatusElement = document.getElementById('pickaxe-amount');
const shovelCost = 100; // Cost of the shovel
const shovelStatusElement = document.getElementById('shovel-amount');
const amountSlider = document.getElementById('amount-slider');





function updateResources() {
    woodAmount.textContent = resources.wood;
    stoneAmount.textContent = resources.stone;
    sandAmount.textContent = resources.sand;
    moneyAmount.textContent = money;
    lumberjackCountElement.textContent = worker.lumberjack.count;
    quarryWorkerCountElement.textContent = worker.quarryWorker.count;
    sandWorkerCountElement.textContent = worker.sandWorker.count;
    lumberjackCostElement.textContent = getCost(worker.lumberjack.baseCost, worker.lumberjack.count);
    quarryWorkerCostElement.textContent = getCost(worker.quarryWorker.baseCost, worker.quarryWorker.count);
    sandWorkerCostElement.textContent = getCost(worker.sandWorker.baseCost, worker.sandWorker.count);
    if (hasAxe) {
        axeStatusElement.textContent = 'Gekauft';
    } else {
        axeStatusElement.textContent = 'Nicht gekauft';
    }
    if (hasPickaxe) {
        pickaxeStatusElement.textContent = 'Gekauft';
    } else {
        pickaxeStatusElement.textContent = 'Nicht gekauft';
    }
    if (hasShovel) {
        shovelStatusElement.textContent = 'Gekauft';
    } else {
        shovelStatusElement.textContent = 'Nicht gekauft';
    }

}
function collectResource(resource) {
    resources[resource]++;
    updateResources();
}
function sellResource(resource) {
    const amount = Math.min(sellAmount, resources[resource]);
    if (amount > 0) {
        resources[resource] -= amount;
        money += amount * sellPrices[resource];
        updateResources();
    }
}
function getCost(baseCost, count) {
    return Math.floor(baseCost * Math.pow(1.15, count));
}
function setSellAmount(amount, button) {
    sellAmount = amount
    amountSlider.style.left = button.offsetLeft + 'px';
    amountSlider.style.width = button.offsetWidth + 'px';
}
function buyWorker(workerType) {
    const cost = getCost(worker[workerType].baseCost, worker[workerType].count);
    if (money >= cost) {
        money -= cost;
        worker[workerType].count++;
        updateResources();
    }
}
function buyAxe() {

    if (money >= axeCost && !hasAxe) {
        money -= axeCost;
        hasAxe = true;
        toolCheck(); // Update production rate after buying the axe
        updateResources();
    }
}
function buyPickaxe() {
    if (money >= pickaxeCost && !hasPickaxe) {
        money -= pickaxeCost;
        hasPickaxe = true;
        toolCheck(); // Update production rate after buying the pickaxe
        updateResources();
    }
}
function buyShovel() {
    if (money >= shovelCost && !hasShovel) {
        money -= shovelCost;
        hasShovel = true;
        toolCheck(); // Update production rate after buying the shovel
        updateResources();
    }
}
function saveGame() {
    const gameState = {
        resources: resources,
        money: money,
        worker: worker,
        hasAxe: hasAxe,
        hasPickaxe: hasPickaxe,
        hasShovel: hasShovel
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
        if (gameState.worker) {
            worker.lumberjack.count = gameState.worker.lumberjack.count ?? 0;
            worker.quarryWorker.count = gameState.worker.quarryWorker.count ?? 0;
            worker.sandWorker.count = gameState.worker.sandWorker.count ?? 0;
        }
        hasAxe = gameState.hasAxe ?? false;
        hasPickaxe = gameState.hasPickaxe ?? false;
        hasShovel = gameState.hasShovel ?? false;
        updateResources();
    }
}
loadGame();
function resetGame() {
    const confirmation = confirm("Möchten Sie das Spiel wirklich zurücksetzen? Alle Fortschritte gehen verloren.");
    if (!confirmation) {
        return;
    }
    localStorage.removeItem('gameState');
    location.reload();

}
function toolCheck() {
    if (hasAxe) {
        worker.lumberjack.productionRate = 2; // Double production rate if the player has an axe
    }
    if (hasPickaxe) {
        worker.quarryWorker.productionRate = 2; // Double production rate if the player has a pickaxe
    }
    if (hasShovel) {
        worker.sandWorker.productionRate = 2; // Double production rate if the player has a shovel
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
    buyWorker('lumberjack');
});
const buyQuarryWorkerButton = document.getElementById('buy-quarry-worker');
buyQuarryWorkerButton.addEventListener('click', function () {
    buyWorker('quarryWorker');
});
const buySandWorkerButton = document.getElementById('buy-sand-worker');
buySandWorkerButton.addEventListener('click', function () {
    buyWorker('sandWorker');
});
const buyAxeButton = document.getElementById('buy-axe');
buyAxeButton.addEventListener('click', function () {
    buyAxe();
});
const buyPickaxeButton = document.getElementById('buy-pickaxe');
buyPickaxeButton.addEventListener('click', function () {
    buyPickaxe();
});
const buyShovelButton = document.getElementById('buy-shovel');
buyShovelButton.addEventListener('click', function () {
    buyShovel();
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
const resetButton = document.getElementById('reset-game');
resetButton.addEventListener('click', function () {
    resetGame();
});
const amount1Button = document.getElementById('amount-1');
amount1Button.addEventListener('click', function () {
    setSellAmount(1, amount1Button);
});
const amount10Button = document.getElementById('amount-10');
amount10Button.addEventListener('click', function () {
    setSellAmount(10, amount10Button);
});
const amount100Button = document.getElementById('amount-100');
amount100Button.addEventListener('click', function () {
    setSellAmount(100, amount100Button);
});
const amountMaxButton = document.getElementById('amount-max');
amountMaxButton.addEventListener('click', function () {
    setSellAmount(Infinity, amountMaxButton);
});
setSellAmount(1, amount1Button); // Set default sell amount to 1 and activate the button
setInterval(function () {
    if (worker.lumberjack.count > 0) {
        resources.wood += worker.lumberjack.count * worker.lumberjack.productionRate;
        updateResources();
    }
    if (worker.quarryWorker.count > 0) {
        resources.stone += worker.quarryWorker.count * worker.quarryWorker.productionRate;
        updateResources();
    }
    if (worker.sandWorker.count > 0) {
        resources.sand += worker.sandWorker.count * worker.sandWorker.productionRate;
        updateResources();
    }
}, 1000);
setInterval(function () {
    saveGame();
}, 10000);


