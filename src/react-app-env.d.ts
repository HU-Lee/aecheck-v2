/// <reference types="react-scripts" />

// character.json을 파싱할 때 사용하는 interface
interface CharacterInfo {
    id: number;
    code: string;
    style: string;
    category: number;
    free: boolean;
    sky: string;
    first: boolean;
    jonly: boolean;
    gonly: boolean;
    from: number[];
    change: number[];
    book: string;
    book_get: string[];
    manifest_jap: string;
    manifest_glo: string;
}

// buddy.json을 파싱할 때 사용하는 interface
interface BuddyInfo {
    id: number;
    code: string;
    free: boolean;
    jonly: boolean;
    gonly: boolean;
    from: number[];
}

// dungeon.json을 파싱할 때 사용하는 interface
interface DungeonLinkInfo {
    name: string;
    endpoint: string;
}

// personality.json을 파싱할 때 사용하는 interface
interface PersonalityInfo {
    name: string;
    is_extra: boolean;
    personality: string[];
    description?: string;
    code: string
}

interface SaveData {
    inven: number[],
    manifest: number[]
    buddy: number[]
}

// 캐릭터 정보 배열을 사용하는 Component의 Props
// 사용되는 곳 : CheckComponent, CharacterGroup
interface CharInfoProps {
    infos: CharacterInfo[]
}

// 버디 관련
interface BuddyOrganProps {
    infos: CharacterInfo[]
    buddys: BuddyInfo[]
}

interface BuddyMoleculeProps {
    infos: CharacterInfo[]
    buddy: BuddyInfo
}

interface CharacterTableViewProps extends CharacterInfo {
    have: boolean;
}