import { GLO_BUDDY_NEW, GLO_MANIFEST_NEW, GLO_NEW, JAP_BUDDY_NEW, JAP_MANIFEST_NEW, JAP_NEW } from "../data/config";
import { STYLES } from "../data/constant";


/*
--------------------------------------------
            Sorting Function
--------------------------------------------
*/

// 버전의 신 캐릭터를 맨 앞으로 보내도록 sort
export const new_char_to_top = (array: CharacterInfo[], version: string) => {
    const target_chars = version==="japanese" ? JAP_NEW : GLO_NEW
    array.sort((a,b) => !target_chars.includes(a.code) ? 1 : -1)
    array.sort((a,b) => {
        if(target_chars.includes(a.code)) {
            return STYLES.indexOf(a.style) - STYLES.indexOf(b.style)
        }
        return 0
    })
}

// 버전의 신 현현 캐릭터를 맨 앞으로 보내도록 sort
export const new_manifest_to_top = (array: CharacterInfo[], version: string) => {
    const target_chars = version==="japanese" ? JAP_MANIFEST_NEW : GLO_MANIFEST_NEW
    array.sort((a,b) => !target_chars.includes(a.id) ? 1 : -1)
}

// 버전의 신 버디를 맨 앞으로 보내도록 sort
export const new_buddy_to_top = (array: BuddyInfo[], version: string) => {
    const target_chars = version==="japanese" ? JAP_BUDDY_NEW : GLO_BUDDY_NEW
    array.sort((a,b) => !target_chars.includes(a.id.toString()) ? 1 : -1)
}