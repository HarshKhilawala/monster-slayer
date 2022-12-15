function getRandomValue(min,max){
    return Math.floor(Math.random()*(max-min))+min;
}

const app = Vue.createApp({
    data(){
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound:0,
            winner: null,
            logMessages: [],
        };
    },

    watch:{
        playerHealth(value){
            if (value<=0 && this.monsterHealth<=0){
                this.winner= 'draw';
            } else if (value<=0){
                this.winner= 'monster';
            }
        },

        monsterHealth(value){
            if(value<=0 && this.playerHealth<=0){
                this.winner = 'draw';
            } else if (value<=0){
                this.winner = 'player';
            }
        }
    },

    computed:{
        getMonsterBarStyles(){
            if(this.monsterHealth<=0){
                return {width: '0%'};
            } else {
                return {width:this.monsterHealth+'%'};
            }
        },

        getPlayerBarStyles(){
            if(this.playerHealth<=0){
                return {width: '0%'};
            } else {
                return {width:this.playerHealth+'%'};
            }
        },

        mayUseSpecialAttack(){
            return this.currentRound % 3 !== 0;
        },
    },

    methods: {

        startOver(){
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.winner = null;
            this.currentRound = 0;
            this.logMessages = [];
        },

        attackMonster(){
            this.currentRound++;
            const attackValue = getRandomValue(5,12);
            this.monsterHealth -= attackValue;
            this.messageLog('player','attack',attackValue);
            this.attackPlayer();
        },

        attackPlayer(){
            const attackValue = getRandomValue(8,15);
            this.playerHealth -= attackValue;
            this.messageLog('monster','attack',attackValue);
        },

        specialAttackMonster(){
            this.currentRound++;
            const attackValue = getRandomValue(10,25);
            this.monsterHealth -= attackValue;
            this.messageLog('player', 'attack', attackValue);
            this.attackPlayer();
        },

        healPlayer(){
            this.currentRound++;
            const healValue = getRandomValue(8,20);
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            }
            this.messageLog('player','heals',healValue);
            this.attackPlayer();
        },

        surrender(){
            this.winner = 'monster';
        },

        messageLog(who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value,
            });
        }

    }
});

app.mount('#game');