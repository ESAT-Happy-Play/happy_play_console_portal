export const MenuList = {
    UserTypes: [
        {
            userTypeId: 1,
            userTypeName: 'Supper Admin',
            groupType: '1',
            roleType: 0
        },
        {
            userTypeId: 2,
            userTypeName: 'Operator',
            groupType: '1',
            roleType: 0
        },
        {
            userTypeId: 3,
            userTypeName: 'Master Agent',
            groupType: '1',
            roleType: 1
        },
        {
            userTypeId: 4,
            userTypeName: 'Agent',
            groupType: '1',
            roleType: 0
        }
    ],
    Details: [
        {
            menuId: 1,
            menuCode: 'Home.Home', 
            menuName: 'Home',
            isParent: false,
            parentId: null,
            securityGroupId: null,
            companyId: 1,
            readWrite: false,
            enabled: null
        },
        {
            menuId: 2,
            menuCode: 'Administrative', 
            menuName: 'Administrative',
            isParent: true,
            parentId: null,
            securityGroupId: null,
            companyId: 1,
            readWrite: false,
            enabled: null
        },
        {
            menuId: 3,
            menuCode: 'Administrative.Company', 
            menuName: 'Company',
            isParent: false,
            parentId: 2,
            securityGroupId: null,
            companyId: 1,
            readWrite: true,
            enabled: null
        },
        {
            menuId: 4,
            menuCode: 'Administrative.Branch', 
            menuName: 'Branch',
            isParent: false,
            parentId: 2,
            securityGroupId: null,
            companyId: 1,
            readWrite: true,
            enabled: null
        },
        {
            menuId: 5,
            menuCode: 'Administrative.Roles', 
            menuName: 'Roles',
            isParent: false,
            parentId: 2,
            securityGroupId: null,
            companyId: 1,
            readWrite: true,
            enabled: null
        },
        {
            menuId: 6,
            menuCode: 'Administrative.UserVerification', 
            menuName: 'User Verification',
            isParent: false,
            parentId: 2,
            securityGroupId: null,
            companyId: 1,
            readWrite: true,
            enabled: null
        },
        {
            menuId: 7,
            menuCode: 'Administrative.UserStatus', 
            menuName: 'User Status',
            isParent: false,
            parentId: 2,
            securityGroupId: null,
            companyId: 1,
            readWrite: true,
            enabled: null
        },
        {
            menuId: 8,
            menuCode: 'Administrative.UserGames', 
            menuName: 'Games',
            isParent: false,
            parentId: 2,
            securityGroupId: null,
            companyId: 1,
            readWrite: true,
            enabled: null
        },
        {
            menuId: 9,
            menuCode: 'UserAccounts', 
            menuName: 'User Accounts',
            isParent: true,
            parentId: null,
            securityGroupId: null,
            companyId: 1,
            readWrite: true,
            enabled: null
        },
        {
            menuId: 10,
            menuCode: 'UserAccounts.SystemUsers', 
            menuName: 'System Users',
            isParent: false,
            parentId: 9,
            securityGroupId: null,
            companyId: 1,
            readWrite: true,
            enabled: null
        },
        {
            menuId: 11,
            menuCode: 'UserAccounts.MasterAgents', 
            menuName: 'Master Agents',
            isParent: false,
            parentId: 9,
            securityGroupId: null,
            companyId: 1,
            readWrite: true,
            enabled: null
        },
        {
            menuId: 12,
            menuCode: 'UserAccounts.Agents', 
            menuName: 'Agents',
            isParent: false,
            parentId: 9,
            securityGroupId: null,
            companyId: 1,
            readWrite: true,
            enabled: null
        },
        {
            menuId: 13,
            menuCode: 'UserAccounts.Players', 
            menuName: 'Players',
            isParent: false,
            parentId: 9,
            securityGroupId: null,
            companyId: 1,
            readWrite: true,
            enabled: null
        },
        {
            menuId: 14,
            menuCode: 'Game', 
            menuName: 'Game',
            isParent: true,
            parentId: null,
            securityGroupId: null,
            companyId: 1,
            readWrite: true,
            enabled: null
        },
        {
            menuId: 15,
            menuCode: 'Game.ScheduleSettings', 
            menuName: 'Schedule Settings',
            isParent: false,
            parentId: 14,
            securityGroupId: null,
            companyId: 1,
            readWrite: true,
            enabled: null
        },
        {
            menuId: 16,
            menuCode: 'Game.MechanicsSettings', 
            menuName: 'Mechanics Settings',
            isParent: false,
            parentId: 14,
            securityGroupId: null,
            companyId: 1,
            readWrite: true,
            enabled: null
        },
        {
            menuId: 17,
            menuCode: 'Game.StoreSettings', 
            menuName: 'Store Settings',
            isParent: false,
            parentId: 14,
            securityGroupId: null,
            companyId: 1,
            readWrite: true,
            enabled: null
        },
        {
            menuId: 18,
            menuCode: 'Game.Promotions', 
            menuName: 'Promotions',
            isParent: false,
            parentId: 14,
            securityGroupId: null,
            companyId: 1,
            readWrite: true,
            enabled: null
        },
        {
            menuId: 19,
            menuCode: 'Game.Bets', 
            menuName: 'Bets',
            isParent: false,
            parentId: 14,
            securityGroupId: null,
            companyId: 1,
            readWrite: true,
            enabled: null
        },
        {
            menuId: 20,
            menuCode: 'Game.Results', 
            menuName: 'Results',
            isParent: false,
            parentId: 14,
            securityGroupId: null,
            companyId: 1,
            readWrite: true,
            enabled: null
        },
        {
            menuId: 21,
            menuCode: 'Game.GamePrizes', 
            menuName: 'Game Prizes',
            isParent: false,
            parentId: 14,
            securityGroupId: null,
            companyId: 1,
            readWrite: true,
            enabled: null
        }
    ]
}