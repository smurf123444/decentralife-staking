const mask = (w) => (1n << w) - 1n;
const bnToHex = (bn) => {
    let s = bn.toString(16);
    if(bn % 2n === 0n){
        s = `0${s}`;
    }
    return `0x${s}`;
}

const CLAIM_FLAGS_WIDTH = 8n;
const CLAIM_FLAGS_MASK = mask(CLAIM_FLAGS_WIDTH);
const DAY_WIDTH = 16n;
const DAY_MASK = mask(DAY_WIDTH);
const TIMESTAMP_WIDTH = 40n;
const TIMESTAMP_MASK = mask(TIMESTAMP_WIDTH);
const SATOSHIS_WIDTH = 56n;
const SATOSHIS_MASK = mask(SATOSHIS_WIDTH);
const HEARTS_SHARES_WIDTH = 72n;
const HEARTS_SHARES_MASK = mask(HEARTS_SHARES_WIDTH);
const ETH_WIDTH = 96n;
const ETH_MASK = mask(ETH_WIDTH);
const ADDRESS_WIDTH = 160n;
const ADDRESS_MASK = mask(ADDRESS_WIDTH);


/*
DailyDataUpdate(
    uint256 data0,
    address indexed updaterAddr
)
*/

const decodeDailyDataUpdate = (event) => {
    let d = event.data0;
    const timestamp = d & TIMESTAMP_MASK;
    d = d >> TIMESTAMP_WIDTH;
    const beginDay = d & DAY_MASK;
    d = d >> DAY_WIDTH;
    const endDay = d & DAY_MASK;
    d = d >> DAY_WIDTH;
    const isAutoUpdate = d === 1n;

    return {
        timestamp,
        beginDay,
        endDay,
        isAutoUpdate,
        updaterAddr: event.updaterAddr
    };
}

/*
StakeStart(
    uint256 data0,
    address indexed stakerAddr,
    uint40 indexed stakeId
)
*/

const decodeStakeStart = (event) => {
    let d = event.data0;
    const timestamp = d & TIMESTAMP_MASK;
    d = d >> TIMESTAMP_WIDTH;
    const stakedHearts = d & HEARTS_SHARES_MASK;
    d = d >> HEARTS_SHARES_WIDTH;
    const stakeShares = d & HEARTS_SHARES_MASK;
    d = d >> HEARTS_SHARES_WIDTH;
    const stakedDays = d & DAY_MASK;
    d = d >> DAY_WIDTH;
    const isAutoStake = d === 1n;

    return {
        timestamp,
        stakerAddr: event.stakerAddr,
        stakeId: event.stakeId,
        stakedHearts,
        stakeShares,
        stakedDays,
        isAutoStake
    };
}

/*
StakeGoodAccounting(
    uint256 data0,
    uint256 data1,
    address indexed stakerAddr,
    uint40 indexed stakeId,
    address indexed senderAddr
)
*/

const decodeStakeGoodAccounting = (event) => {
    let d = event.data0;
    const timestamp = d & TIMESTAMP_MASK;
    d = d >> TIMESTAMP_WIDTH;
    const stakedHearts = d & HEARTS_SHARES_MASK;
    d = d >> HEARTS_SHARES_WIDTH;
    const stakeShares = d & HEARTS_SHARES_MASK;
    d = d >> HEARTS_SHARES_WIDTH;
    const payout = d & HEARTS_SHARES_MASK;

    return {
        timestamp,
        stakerAddr: event.stakerAddr,
        stakeId: event.stakeId,
        senderAddr: event.senderAddr,
        stakedHearts,
        stakeShares,
        payout,
        penalty: event.data1
    };
}

/*
StakeEnd(
    uint256 data0,
    uint256 data1,
    address indexed stakerAddr,
    uint40 indexed stakeId
)
*/

const decodeStakeEnd = (event) => {
    let d = event.data0;
    const timestamp = d & TIMESTAMP_MASK;
    d = d >> TIMESTAMP_WIDTH;
    const stakedHearts = d & HEARTS_SHARES_MASK;
    d = d >> HEARTS_SHARES_WIDTH;
    const stakeShares = d & HEARTS_SHARES_MASK;
    d = d >> HEARTS_SHARES_WIDTH;
    const payout = d & HEARTS_SHARES_MASK;

    d = event.data1;
    const penalty = d & HEARTS_SHARES_MASK;
    d = d >> HEARTS_SHARES_WIDTH;
    const servedDays = d & DAY_MASK;
    d = d >> DAY_WIDTH;
    const prevUnlocked = d === 1n;

    return {
        timestamp,
        stakerAddr: event.stakerAddr,
        stakeId: event.stakeId,
        senderAddr: event.senderAddr,
        stakedHearts,
        stakeShares,
        payout,
        penalty,
        servedDays,
        prevUnlocked
    };
}

/*
ShareRateChange(
    uint256 data0,
    uint40 indexed stakeId
)
*/

const decodeShareRateChange = (event) => {
    let d = event.data0;
    const timestamp = d & TIMESTAMP_MASK;
    d = d >> TIMESTAMP_WIDTH;
    const shareRate = d & TIMESTAMP_MASK; // timestamp is 40 bits as is share rate

    return {
        timestamp,
        shareRate,
        stakeId: event.stakeId
    };
}

/*
Claim(
    uint256 data0,
    uint256 data1,
    bytes20 indexed btcAddr,
    address indexed claimToAddr,
    address indexed referrerAddr
)
*/

const decodeClaim = (event) => {
    let d = event.data0;
    const timestamp = d & TIMESTAMP_MASK;
    d = d >> TIMESTAMP_WIDTH;
    const rawSatoshis = d & SATOSHIS_MASK;
    d = d >> SATOSHIS_WIDTH;
    const adjSatoshis = d & SATOSHIS_MASK;
    d = d >> SATOSHIS_WIDTH;
    const claimFlags = d & CLAIM_FLAGS_MASK;
    d = d >> CLAIM_FLAGS_WIDTH;
    const claimedHearts = d & HEARTS_SHARES_MASK;

    return {
        timestamp,
        rawSatoshis,
        adjSatoshis,
        claimedHearts,
        claimFlags,
        senderAddr: bnToHex(this.BigInteger(event.data1))
    };
}


/*
ClaimAssist(
    uint256 data0,
    uint256 data1,
    uint256 data2,
    address indexed senderAddr
)
*/

const decodeClaimAssist = (event) => {
    let d = event.data0;
    const timestamp = d & TIMESTAMP_MASK;
    d = d >> TIMESTAMP_WIDTH;
    const btcAddr = bnToHex(d & ADDRESS_MASK);
    d = d >> ADDRESS_WIDTH;
    const rawSatoshis = d & SATOSHIS_MASK;
    
    d = event.data1;
    const adjSatoshis = d & SATOSHIS_MASK;
    d = d >> SATOSHIS_WIDTH;
    const claimToAddr = bnToHex(d & ADDRESS_MASK);
    d = d >> ADDRESS_WIDTH;
    const claimFlags = d & CLAIM_FLAGS_MASK;
    d = d >> CLAIM_FLAGS_WIDTH;

    d = event.data2;
    const claimedHearts = d & HEARTS_SHARES_MASK;
    d = d >> HEARTS_SHARES_WIDTH;
    const referrerAddr = bnToHex(d & ADDRESS_MASK);

    return {
        timestamp,
        rawSatoshis,
        adjSatoshis,
        claimedHearts,
        claimFlags,
        senderAddr: event.senderAddr,
        claimToAddr,
        btcAddr,
        referrerAddr
    };
}

/*
XfLobbyEnter(
    uint256 data0,
    address indexed memberAddr,
    uint256 indexed entryId,
    address indexed referrerAddr
)
*/
const decodeXfLobbyEnter = (event) => {
    let d = event.data0;
    const timestamp = d & TIMESTAMP_MASK;
    d = d >> TIMESTAMP_WIDTH;
    const rawAmount = d & ETH_MASK;

    return {
        timestamp,
        memberAddr: event.memberAddr,
        entryId: event.entryId,
        referrerAddr: event.referrerAddr,
        rawAmount
    };
}

/*
XfLobbyExit(
    uint256 data0,
    address indexed memberAddr,
    uint256 indexed entryId,
    address indexed referrerAddr
)
*/
const decodeXfLobbyExit = (event) => {
    let d = event.data0;
    const timestamp = d & TIMESTAMP_MASK;
    d = d >> TIMESTAMP_WIDTH;
    const xfAmount = d & HEARTS_SHARES_MASK;

    return {
        timestamp,
        memberAddr: event.memberAddr,
        entryId: event.entryId,
        referrerAddr: event.referrerAddr,
        xfAmount
    };
}

module.exports = {
    decodeClaim,
    decodeClaimAssist,
    decodeDailyDataUpdate,
    decodeShareRateChange,
    decodeStakeEnd,
    decodeStakeGoodAccounting,
    decodeStakeStart,
    decodeXfLobbyEnter,
    decodeXfLobbyExit
};