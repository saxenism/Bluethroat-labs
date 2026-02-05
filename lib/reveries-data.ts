export type BlockType =
    | 'tag'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'text'
    | 'divider'
    | 'bullet-list'
    | 'ordered-list'
    | 'blockquote'
    | 'code-block'
    | 'image';

export interface ContentBlock {
    type: BlockType;
    content?: string;
    items?: string[]; // For lists
    src?: string;     // For images
    caption?: string; // For images
    language?: string; // For code blocks
    metadata?: {
        category?: string;
        date?: string;
        author?: string;
    };
}

export interface BlogPost {
    slug: string;
    title: string;
    bannerImage?: string;
    blocks: ContentBlock[];
}

export const REVERIES: BlogPost[] = [
    {
        slug: 'debunking-teedotfail-panic',
        title: 'Debunking The TeeDotFail Panic: Why TEEs Are Still Viable For Secure Computing',
        bannerImage: '/light-mode/Cover-1.png',
        blocks: [
            {
                type: 'tag',
                metadata: {
                    category: 'TEE Security',
                    date: 'December 13, 2025'
                }
            },
            {
                type: 'h1',
                content: 'Debunking The TeeDotFail Panic: Why TEEs Are Still Viable For Secure Computing'
            },
            {
                type: 'text',
                content: 'By Abhimanyu Gupta'
            },
            {
                type: 'text',
                content: 'OK to continuing commentary on TEE attacks from my previous article on TEE.fail attack, this let’s focus on the wiretap fail.'
            },
            {
                type: 'h2',
                content: 'TL;DR on the Wiretap Attack'
            },
            {
                type: 'text',
                content: 'The recent Wiretap paper (Georgia Tech + Purdue, Oct 2025) is excellent responsible research — exactly how security should advance.'
            },
            {
                type: 'text',
                content: 'They showed that on older DDR4-based TEE systems, a passive -Elk interposer on the memory bus can recover the attestation key by exploiting deterministic encryption.'
            },
            {
                type: 'text',
                content: 'In simple words, this Battering RAM Attack (Codename: Wiretap) relies on something called an interposer that sits between CPU and the RAM sticks (DDR4 Memory) like a man-in-the-middle to observe the data that flows between them.'
            },
            {
                type: 'image',
                src: '/reveries/wiretap-setup.png',
                caption: '[Fig.1] Test system for intercepting the data exchange.'
            },
            {
                type: 'text',
                content: 'Normally, TEE encrypts enclave memory with AES-XTS, which is supposed to protect it. But Intel used deterministic encryption (same plaintext always produces exactly the same cipher-text when using the same key/TWEAK).'
            },
            {
                type: 'text',
                content: "That's a crucial weakness here."
            },
            {
                type: 'text',
                content: 'Because the encryption is deterministic, the attacker can match the exact same memory patterns repeat every time the Quoting Enclave runs its ECDSA signing core.'
            },
            {
                type: 'h3',
                content: 'The Importance of physical attacks on server infrastructure'
            },
            {
                type: 'text',
                content: "Intel has been crystal clear since 2021: SGX's threat model does not isolate physical attackers who can modify or interpose hardware."
            },
            {
                type: 'text',
                content: 'Yet the ecosystem reacted instantly and correctly:'
            },
            {
                type: 'bullet-list',
                items: [
                    'Projects like Secret Network, Phala, Crust paused new node onboarding',
                    'Many are accelerating migration to newer TEEs'
                ]
            },
            {
                type: 'blockquote',
                content: 'In late October 2025, a new security research paper dubbed "TEE.fail" sent many alarms through the tech and crypto communities. I have seen many threads on X amplifying the alarm claiming that TEEs are fundamentally flawed for applications like blockchain privacy and AI. While the attack is clever and highlights real vulnerabilities, I feel like it’s far from rendering TEEs obsolete.'
            },
            {
                type: 'divider'
            },
            {
                type: 'code-block',
                language: 'solidity',
                content: `contract GovToken is ERC20Permit {
    function rebase(uint256 supplyDelta)
        public
    {
        if (supplyDelta == 0) {
            emit LogRebase(_totalSupply);
        }
        _totalSupply = _totalSupply.add(supplyDelta);
        if (_totalSupply > MAX_SUPPLY) {
            /** 
             * @notice Adjusts the total supply of the token
             * @param supplyDelta The amount by which to adjust
             * Positive values increase the supply, negative values
             */
        }
        function rebase(uint256 supplyDelta); external ;
    }
}`
            }
        ]
    },
    {
        slug: 'modelling-the-adversarial',
        title: 'Modelling the Adversarial: When TEEs Are Still Viable for Secure Computing',
        bannerImage: '/light-mode/Cover-2.png',
        blocks: [
            {
                type: 'tag',
                metadata: {
                    category: 'TEE Security',
                    date: 'December 08, 2023'
                }
            },
            {
                type: 'h1',
                content: 'Modelling the Adversarial'
            },
            {
                type: 'text',
                content: 'Understanding the threat landscape is crucial for building secure systems.'
            }
        ]
    },
    {
        slug: 'extending-the-trust-wall',
        title: 'Extending the Trust Wall: Why TEEs Are Still Viable for Secure Computing',
        bannerImage: '/light-mode/Cover-1.png',
        blocks: [
            {
                type: 'tag',
                metadata: {
                    category: 'TEE Security',
                    date: 'November 24, 2023'
                }
            },
            {
                type: 'h1',
                content: 'Extending the Trust Wall'
            },
            {
                type: 'text',
                content: 'TEEs provide a strong foundation for trust in distributed environments.'
            }
        ]
    }
];
