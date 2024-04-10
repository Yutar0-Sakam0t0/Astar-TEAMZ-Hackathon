///// コントラクトAPI /////

//TeamNFT発行
const teamNftMint = async() => {
   const res = await fetch('/api/teamNftMint', {
    method: 'POST',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json();
  return data.success;
}

//Team TBA取得
const teamTba = async(tokenId) => {
  const res = await fetch('/api/teamTba', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tokenId),
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json();
  return data.success;
}

//MemberNFT発行
const memberNftMint = async(teamTba) => {
  const res = await fetch('/api/memberNftMint', {
   method: 'POST',
   headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(teamTba),
});
 if (!res.ok) {
   throw new Error('Failed to fetch data');
 }
 const data = await res.json();
 return data.success;
}

//Member TBA取得
const memberTba = async(tokenId) => {
 const res = await fetch('/api/memberTba', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(tokenId),
});
 if (!res.ok) {
   throw new Error('Failed to fetch data');
 }
 const data = await res.json();
 return data.success;
}

//RewardNFT発行
const rewardNftMint = async(memberTba) => {
  const res = await fetch('/api/rewardNftMint', {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json',
   },
   body: JSON.stringify(memberTba),
 });
 if (!res.ok) {
   throw new Error('Failed to fetch data');
 }
 const data = await res.json();
 return data.success;
}

//RewardNFTのBurn
const rewardNftBurn = async (tokenId) => {
  const res = await fetch('/api/rewardNftBurn', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tokenId),
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await res.json();
  return data;
}

// チーム存在確認
const teamExist = async (teamId) => {
  const res = await fetch('/api/db/teamExist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(teamId),
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const responseData = await res.json();
  return responseData.data;
}

// チーム登録
const registTeam = async (teamId, teamTba) => {
  const data = {
    teamId: teamId,
    teamTba: teamTba,
  };
  console.log(data.teamId, data.teamTba);
  const res = await fetch('/api/db/registTeam', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const responseData = await res.json();
  return responseData.data;
};

// メンバー登録
const registMember = async (teamId, userId, pass) => {
  const data = {
    teamId: teamId,
    userId: userId,
    pass: pass,
  };

  const res = await fetch('/api/db/registMember', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const responseData = await res.json();
  return responseData.data;
};

// メンバー情報更新（イメージID/ニックネーム）
const updateMemberProf = async (imgId, nickName, userTBA, teamId, userId) => {
  const data = {
    imgId: imgId,
    nickName: nickName,
    userTBA: userTBA,
    teamId: teamId,
    userId: userId,
  };

  const res = await fetch('/api/db/updateMemberProf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const responseData = await res.json();
  return responseData.data;
};

// チームIDをキーにして親TBAのアドレスを取得する
const getParentTBAby = async (teamId) => {
  const res = await fetch('/api/db/getParentTBAby', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(teamId),
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const responseData = await res.json();
  return responseData.data;
};

// チームIDをキーにして有効なRewardNFTの数を取得する
const countRewardNftby = async (teamId) => {
  const res = await fetch('/api/db/countRewardNftby', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(teamId),
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const responseData = await res.json();
  return responseData.count;
};

// チームID、ユーザーIDをキーにして親TBAのアドレスを取得する
const getChildTBAby = async (teamId, userId) => {
  const data = {
    teamId: teamId,
    userId: userId,
  };

  const res = await fetch('/api/db/getChildTBAby', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const responseData = await res.json();
  return responseData.data;
};

// RewardNFTの登録をする
const registRewardNft = async (teamId, userId, tokenId) => {
  const data = {
    teamId: teamId,
    userId: userId,
    tokenId: tokenId
  };

  const res = await fetch('/api/db/registRewardNft', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const responseData = await res.json();
  return responseData.data;
};

// チームID、ユーザーIDをキーにして親TBAのアドレスを取得する
const getAvailableRewardNft = async (teamId, userId) => {
  const data = {
    teamId: teamId,
    userId: userId
  };

  const res = await fetch('/api/db/getAvailableRewardNft', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const responseData = await res.json();
  return responseData.data;
};

// RewardNFTのburn済に更新する
const updateRewardNftBurn = async (teamId, userId, tokenId) => {
  const data = {
    teamId: teamId,
    userId: userId,
    tokenId: tokenId
  };

  const res = await fetch('/api/db/updateRewardNftBurn', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const responseData = await res.json();
  return responseData.data;
};

// メンバー確認
const memberExist = async (teamId, userId) => {
  const data = {
    teamId: teamId,
    userId: userId,
  };

  const res = await fetch('/api/db/memberExist', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const responseData = await res.json();
  return responseData;
};

export {
  teamNftMint,
  teamTba,
  memberNftMint,
  memberTba,
  rewardNftMint,
  rewardNftBurn,
  teamExist,
  registTeam,
  registMember,
  registRewardNft,
  updateMemberProf,
  updateRewardNftBurn,
  getAvailableRewardNft,
  getChildTBAby,
  getParentTBAby,
  countRewardNftby,
  memberExist
};



/* //ownerNFT保有数確認
const ownerNftBalanceOf = async (walletAddress) => {
  const res = await fetch('/api/ownerNft/balanceOf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(walletAddress),
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const responseData = await res.json();
  return responseData.ownerNftCount;
}

//fanNFT保有数確認
const fanNftBalanceOf = async (walletAddress) => {
  const res = await fetch('/api/ownerNft/balanceOf', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(walletAddress),
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const responseData = await res.json();
  return responseData.fanNftCount;
}


//引換券NFT発行
const ownerNftMint = async (walletAddress, tokenId) => {

  const requestData = {
    walletAddress: walletAddress,
    tokenId: tokenId
  };

  const res = await fetch('/api/ownerNft/ownerNftMint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

//引換申請
const setShipped = async (tokenId) => {
  const res = await fetch('/api/ownerNft/setShipped', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(tokenId),
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

//ファン証明NFT発行
const fanNftMint = async (walletAddress, tokenId) => {

  const requestData = {
    walletAddress: walletAddress,
    tokenId: tokenId
  };

  const res = await fetch('/api/ownerNft/fanNftMint', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}


///// データベースAPI /////

//wallet_addressフェッチ
const fetchWalletAddress = async (walletAddress) => {
  const res = await fetch('/api/db/fetchWalletAddress', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(walletAddress),
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

//wallet_addressインサート
const insertWalletAddress = async (walletAddress) => {
  const res = await fetch('/api/db/insertWalletAddress', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(walletAddress),
  });
  if (!res.ok) {
    throw new Error('Failed to insert data')
  }
  return res.json()
}

//user_agreeフェッチ
const fetchUserAgree = async (walletAddress) => {
  const res = await fetch('/api/db/fetchUserAgree', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(walletAddress),
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const responseData = await res.json();
  return responseData.data;
}

//user_agreeアップデート
const updateUserAgree = async (walletAddress) => {
  const res = await fetch('/api/db/updateUserAgree', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(walletAddress),
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

//nft_acquiredフェッチ
const fetchNftAcquired = async (walletAddress) => {
  const res = await fetch('/api/db/fetchNftAcquired', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(walletAddress),
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const responseData = await res.json();
  return responseData.data;
}

//nft_acquiredアップデート
const updateNftAcquired = async (walletAddress) => {
  const res = await fetch('/api/db/updateNftAcquired', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(walletAddress),
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
} */


