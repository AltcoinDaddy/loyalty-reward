import Web3 from 'web3';

export class MockPancakeSwapContract {
  private web3: Web3;
  private account: string;

  constructor(web3: Web3, account: string) {
    this.web3 = web3;
    this.account = account;
  }

  async stake(amount: number): Promise<boolean> {
    // Simulate a blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  }

  async unstake(amount: number): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  }

  async provideLiquidity(amount: number): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  }

  async removeLiquidity(amount: number): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return true;
  }

  async getStakedAmount(): Promise<number> {
    return 1000; // Mock value
  }

  async getLiquidityProvided(): Promise<number> {
    return 5000; // Mock value
  }

  async getRewards(): Promise<number> {
    return 50; // Mock value
  }
}