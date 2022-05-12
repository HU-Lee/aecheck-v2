import { createContext, useState } from "react";
import { STYLES } from "../data/constant";

/**
 * 사이트 전반에 적용되는 context입니다. 
 * 
 * @param lang: 언어 정보, 기본값 ko (한국어), 로컬 스토리지에 a_lan으로 저장
 * @function changeLang
 * 
 * @param version: 버전 정보, 기본값 global, 로컬 스토리지에 a_ver으로 저장
 * @function changeVersion
 * 
 * @param inven: 보유 캐릭터 정보, 로컬 스토리지에 a_inv_new으로 저장
 * @function setInven
 * @function addInven : 보유 캐릭터 추가 함수
 * @function removeInven : 보유 캐릭터 추가 함수
 * 
 * @param manifest: 보유 현현 정보, 진행상황*10000 + id로 저장, 로컬 스토리지에 a_man으로 저장
 * @function setManifest
 * @function changeManifest
 * 
 * @param select_char_data : 체크 메뉴에서 쓰이는 캐릭터 데이터 배열
 * @param char_codes : 전체 캐릭터 코드 배열
 * 
 * @description a_new는 구 버전 체크리스트에서 사용중이었으며 
 * 이는 사용자가 캐시를 지우지 않는 한 지우지 않습니다.
 */
const AnotherContext = createContext({
    lang: "ko", 
    changeLang: (word: string) => {},
    version: "global",
    changeVersion: (value: string) => {},
    inven: [] as number[],
    setInven: (data: number[]) => {},
    addInven: (ids : number[]) => {},
    removeInven: (id : number) => {},
    manifest: [] as number[],
    setManifest: (data: number[]) => {},
    changeManifest: (level: number, id: number) => {},
    select_char_data: [] as Array<CharacterInfo>,
    char_codes: [] as string[]
})

interface Props {
  children: JSX.Element | JSX.Element[];
}

const AnotherProvider = ({ children }: Props): JSX.Element => {

    // raw character data
    const char_raw: Array<CharacterInfo> = require("../data/character.json")

    const [lang, setLang] = useState(window.localStorage.getItem("a_lan") || "ko");
    const changeLang = (word: string): void => {
      setLang(word);
      window.localStorage.setItem("a_lan", word)
    };

    

    const [version, setVersion] = useState(window.localStorage.getItem("a_ver") || "global")
    const changeVersion = (version: string): void => {
      setVersion(version);
      window.localStorage.setItem("a_ver", version)
    };



    const [inven, setInven] = useState(() => {
      // 기존 데이터와 현재 데이터를 match시켜주는 데이터
      const convert_data = require("../data/old_to_new.json")

      // case에 따라서 데이터를 불러옵니다. 구 버전 데이터가 있는 경우 변환합니다.
      const local = window.localStorage.getItem("a_inv")?.split(",").map(Number) || [] as number[]
      const new_local = window.localStorage.getItem("a_inv_new")?.split(",").map(Number) || local.map(a => convert_data[String(a)] ?? -1 )

      // from에 있는 캐릭터들은 필요조건이므로 없을 경우 추가시킵니다.
      const add = char_raw.filter(a => new_local.includes(a.id)).map(a => a.from)

      return Array.from(new Set(new_local.concat(...add)))
    })
    const addInven = (ids: number[]): void => {
      const newData = Array.from(new Set([...inven, ...ids]))
      window.localStorage.setItem("a_inv_new", newData.join(","))
      setInven(newData);
    };
    const removeInven = (id: number): void => {
      const newData = inven.filter(a => a !== id)
      window.localStorage.setItem("a_inv_new", newData.join(","))
      setInven(newData);
    };



    const [manifest, setManifest] = useState(window.localStorage.getItem("a_man")?.split(",").map(Number) || [] as number[])
    const changeManifest = (level:number, id: number): void => {
      // 기존 현현 정보를 지우고 새로운 현현 정보를 넣습니다.
      const parsedData = manifest.filter(a => a%10000 !== id)
      const newData = Array.from(new Set([...parsedData, level*10000 + id]))
      window.localStorage.setItem("a_man", newData.join(","))
      setManifest(newData);
    };



    // select_char_data : code 우선, 그 다음 style로 정렬
    const select_char_data = [...char_raw].sort((a,b) => {
      if (a.code !== b.code) return a.code > b.code ? 1 : -1
      else return STYLES.indexOf(a.style) - STYLES.indexOf(b.style)
    })

    const char_codes = Array.from(new Set(char_raw.map(a => a.code)))

  
    return (
      <AnotherContext.Provider
        value={{
          lang,
          changeLang,
          version,
          changeVersion,
          inven,
          setInven,
          addInven,
          removeInven,
          manifest,
          setManifest,
          changeManifest,
          select_char_data,
          char_codes
        }}>
        {children}
      </AnotherContext.Provider>
    );
};
  
export { AnotherContext, AnotherProvider }