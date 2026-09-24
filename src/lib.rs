use anchor_lang::prelude::*;
// use anchor_spl::token_interface::accessor::authority;

declare_id!("6r6mzziDKMbkfcfMdwuEoMdCDX8PFbHyGfsqJSm7Kb5V");

#[error_code]
pub enum MyError {
    #[msg("You are not authorized to perform this action.")]
    UnauthorizedMod,
    #[msg("The provided age is too young.")]
    AgeTooLow,
    #[msg("Insufficient balance")]
    BalanceTooLow,
}

#[program]
mod point_system {
    use super::*;

    pub fn init_player(ctx: Context<InitPlayer>)-> Result<()>{
        let player = &mut ctx.accounts.player;
        player.authority = ctx.accounts.signer.key();

        // Init players with 100 points
        player.points = 100;
        Ok(())
    }

    pub fn transfer_points(ctx: Context<TransferPoints>, amount: u64)-> Result<()>{

        let player1 = &mut ctx.accounts.from;
        let player2 = &mut ctx.accounts.to;

        require!(player1.points >= amount, MyError::BalanceTooLow);

        player1.points -= amount;
        player2.points += amount;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitPlayer<'info> {
    #[account(init, payer = signer, seeds=[b"player", signer.key().as_ref()], bump, space= 8+8+32)]
    player: Account<'info, Player>,
    #[account(mut)]
    signer: Signer<'info>,
    system_program: Program<'info, System>
}

#[derive(Accounts)]
pub struct TransferPoints<'info>{
    #[account(mut)]
    to: Account<'info, Player>,
    #[account(mut, has_one=authority)]
    from: Account<'info, Player>,
    authority: Signer<'info>,
}


#[account]
pub struct Player {
    points: u64,
    authority: Pubkey
}