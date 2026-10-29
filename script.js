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
const unlocks = {
    wood: {
        unlocked: true,
    },
    stone: {
        unlocked: false, 
        costResource: 'wood',
        cost: 500
    },
    sand: {
        unlocked: false,
        costResource: 'stone',
        cost: 1000
    }
};
const tools = {
    axe: {
        owned: false,
        cost: 500,
        workerType: 'lumberjack'
    },
    pickaxe: {
        owned: false,
        cost: 1000,
        workerType: 'quarryWorker'
    },
    shovel: {
        owned: false,
        cost: 2000,
        workerType: 'sandWorker'
    },
};
let money = 0;
let selectedAmount = 1;
let gameMusicStarted = false;
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
const stoneLockedElement = document.getElementById('stoneLocked');
const sandLockedElement = document.getElementById('sandLocked');
const stoneUnlockedElement = document.getElementById('stoneUnlocked');
const sandUnlockedElement = document.getElementById('sandUnlocked');
const axeStatusElement = document.getElementById('axe-amount');
const pickaxeStatusElement = document.getElementById('pickaxe-amount');
const shovelStatusElement = document.getElementById('shovel-amount');
const amountSlider = document.getElementById('amount-slider');
const lockedItems = document.querySelectorAll('[data-requires]');
const introScreen = document.getElementById('intro-screen');
const hammer = document.getElementById('hammer');
const mainMenu = document.getElementById('main-menu');
const anvilSound = new Audio('sounds/anvil.mp3');
const menuSound = new Audio('sounds/Sword.mp3');
menuSound.loop = true;
menuSound.volume = 0.4;
const playlist = [
    { title: 'Medieval Kingdoms', artist: 'Daniel Roberts', file: 'sounds/kingdoms.mp3' },
    { title: 'Mountain Knight Castle', artist: 'Vlad Bakutov', file: 'sounds/knight-castle.mp3' },
    { title: 'Medieval Celtic Violin', artist: '_Music_for_Creators_', file: 'sounds/celtic-violine.mp3' },
    { title: 'Musik Hintergrund', artist: 'OTH Amberg-Weiden', file: 'sounds/hintergrund.mp3' },
];
const gameMusic = new Audio();
gameMusic.volume = 0.4;
let currentTrack = 0;
const nowPlayingElement = document.getElementById('now-playing');

function playTrack(index) {
    const track = playlist[index];
    gameMusic.src = track.file;
    gameMusic.play();
    nowPlayingElement.textContent = '♪ ' + track.title + ' – ' + track.artist;
}
function updateResources() {
    woodAmount.textContent = resources.wood;
    stoneAmount.textContent = resources.stone;
    sandAmount.textContent = resources.sand;
    moneyAmount.textContent = money;
    lumberjackCountElement.textContent = worker.lumberjack.count;
    quarryWorkerCountElement.textContent = worker.quarryWorker.count;
    sandWorkerCountElement.textContent = worker.sandWorker.count;
    lumberjackCostElement.textContent = getTotalCost('lumberjack', getBuyAmount('lumberjack'));
    quarryWorkerCostElement.textContent = getTotalCost('quarryWorker', getBuyAmount('quarryWorker'));
    sandWorkerCostElement.textContent = getTotalCost('sandWorker', getBuyAmount('sandWorker'));
    if (tools.axe.owned) {
        axeStatusElement.textContent = 'Gekauft';
    } else {
        axeStatusElement.textContent = 'Nicht gekauft';
    }
    if (tools.pickaxe.owned) {
        pickaxeStatusElement.textContent = 'Gekauft';
    } else {
        pickaxeStatusElement.textContent = 'Nicht gekauft';
    }
    if (tools.shovel.owned) {
        shovelStatusElement.textContent = 'Gekauft';
    } else {
        shovelStatusElement.textContent = 'Nicht gekauft';
    }
    if (unlocks.stone.unlocked) {
        stoneLockedElement.style.display = 'none';
        stoneUnlockedElement.style.display = 'block';

    } else {
        stoneUnlockedElement.style.display = 'none';
        stoneLockedElement.style.display = 'block';
    }
    if (unlocks.sand.unlocked) {
        sandLockedElement.style.display = 'none';
        sandUnlockedElement.style.display = 'block';
    } else {
        sandUnlockedElement.style.display = 'none';
        sandLockedElement.style.display = 'block';
    }
    updateLockedItems();

}
function collectResource(resource) {
    resources[resource]++;
    updateResources();
}
function sellResource(resource) {
    const amount = Math.min(selectedAmount, resources[resource]);
    if (amount > 0) {
        resources[resource] -= amount;
        money += amount * sellPrices[resource];
        updateResources();
    }
}
function getCost(baseCost, count) {
    return Math.floor(baseCost * Math.pow(1.15, count));
}
function getTotalCost(workerType, amount) {
    let total = 0;
    for (let i = 0; i < amount; i++) {
        total += getCost(worker[workerType].baseCost, worker[workerType].count + i);
    }
    return total;
}
function setSelectedAmount(amount, button) {
    selectedAmount = amount;
    amountSlider.style.left = button.offsetLeft + 'px';
    amountSlider.style.width = button.offsetWidth + 'px';
    updateResources(); // Update the costs displayed for workers based on the selected amount
}
function getBuyAmount(workerType) {
    if (selectedAmount === Infinity) {
        return getMaxAffordableAmount(workerType);
    }
    return selectedAmount;
}
function buyWorker(workerType) {
    const amount = getBuyAmount(workerType);
    const cost = getTotalCost(workerType, amount);
    if (amount > 0 && money >= cost) {
        money -= cost;
        worker[workerType].count += amount;
        updateResources();
    }
}
function getMaxAffordableAmount(workerType) {
    let amount = 0;
    let total = 0;
    while (total + getCost(worker[workerType].baseCost, worker[workerType].count + amount) <= money) {
       total += getCost(worker[workerType].baseCost, worker[workerType].count + amount);
       amount++;
    }
    return amount;
}
function unlockResource(resource) {
    const payWith = unlocks[resource].costResource;   // z. B. 'wood'
    const cost = unlocks[resource].cost;              // z. B. 500
    if (resources[payWith] >= cost && !unlocks[resource].unlocked ) {
        resources[payWith] -= cost;
        unlocks[resource].unlocked = true;
        updateResources();
    }
}
function updateLockedItems() {
    for (const item of lockedItems) {
        const required = item.dataset.requires.split(' ');
        let allUnlocked = true;
        for (const resource of required) {
            if (!unlocks[resource].unlocked) {
                allUnlocked = false;
            }
        }
        if (allUnlocked) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    }
}
function buyTool(toolType) {
    const cost = tools[toolType].cost
    const owned = tools[toolType].owned
    const workerType = tools[toolType].workerType
    if (money >= cost && !owned) {
        money -= cost;
        tools[toolType].owned = true;
        worker[workerType].productionRate = 2;
        updateResources();
    }
}
function saveGame() {
    const gameState = {
        resources: resources,
        money: money,
        worker: worker,
        tools : tools,
        unlocks: unlocks
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
        if (gameState.unlocks) {
            unlocks.stone.unlocked = gameState.unlocks.stone.unlocked ?? false;
            unlocks.sand.unlocked = gameState.unlocks.sand.unlocked ?? false;
        }
        if (gameState.tools) {
            tools.axe.owned = gameState.tools.axe.owned ?? false;
            tools.pickaxe.owned = gameState.tools.pickaxe.owned ?? false;
            tools.shovel.owned = gameState.tools.shovel.owned ?? false;
        }
        toolCheck();
        updateResources();
    }
}
function toolCheck() {
    if (tools.axe.owned) {
        worker.lumberjack.productionRate = 2;
    }
    if (tools.pickaxe.owned) {
        worker.quarryWorker.productionRate = 2;
    }
    if (tools.shovel.owned) {
        worker.sandWorker.productionRate = 2;
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
    buyTool('axe');
});
const buyPickaxeButton = document.getElementById('buy-pickaxe');
buyPickaxeButton.addEventListener('click', function () {
    buyTool('pickaxe');
});
const buyShovelButton = document.getElementById('buy-shovel');
buyShovelButton.addEventListener('click', function () {
    buyTool('shovel');
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
    setSelectedAmount(1, amount1Button);
});
const amount10Button = document.getElementById('amount-10');
amount10Button.addEventListener('click', function () {
    setSelectedAmount(10, amount10Button);
});
const amount100Button = document.getElementById('amount-100');
amount100Button.addEventListener('click', function () {
    setSelectedAmount(100, amount100Button);
});
const amountMaxButton = document.getElementById('amount-max');
amountMaxButton.addEventListener('click', function () {
    setSelectedAmount(Infinity, amountMaxButton);
});
const stoneUnlockButton = document.getElementById('unlock-stone');
stoneUnlockButton.addEventListener('click', function () {
    unlockResource('stone');
});
const sandUnlockButton = document.getElementById('unlock-sand');
sandUnlockButton.addEventListener('click', function () {
    unlockResource('sand'); 
});
const startGameButton = document.getElementById('start-game');
startGameButton.addEventListener('click', function () {
    hammer.classList.add('strike');
    setTimeout(function () {
        introScreen.classList.add('shake');
        anvilSound.play();
    }, 400);
    setTimeout(function () {
        introScreen.classList.add('hidden');
        mainMenu.classList.remove('hidden');
        menuSound.play();
    }, 800);

});
const playButton = document.getElementById('menu-play');
playButton.addEventListener('click', function () {
    mainMenu.classList.add('hidden');
    menuSound.pause();
    if (gameMusicStarted) {
        gameMusic.play();
    } else {
        playTrack(currentTrack);
        gameMusicStarted = true;
    }
    
});
const menuButton = document.getElementById('nav-menu');
menuButton.addEventListener('click', function () {
    mainMenu.classList.remove('hidden');
    gameMusic.pause();
    menuSound.play();
});
gameMusic.addEventListener('ended', function () {
    currentTrack = (currentTrack + 1) % playlist.length;
    playTrack(currentTrack);
});

setSelectedAmount(1, amount1Button); // Set default sell amount to 1 and activate the button
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


