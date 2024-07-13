"use client"; // クライアントコンポーネントとしてマーク

import React, { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import "../app/table.css";

const data = [
  { content: "0", team: "it班", price2: "¥10,000", date: "2024/3/6" },
  { content: "1", team: "ゲーム班", price2: "¥10,000", date: "2024/4/6" },
  { content: "2", team: "it班", price2: "¥10,000", date: "2024/5/6" },
  { content: "3", team: "絵描き班", price2: "¥10,000", date: "2022/3/15" },
  { content: "4", team: "dtm班", price2: "¥10,000", date: "2022/5/15" },
  { content: "5", team: "ゲーム班", price2: "¥10,000", date: "2023/5/10" },
  { content: "6", team: "ゲーム班", price2: "¥10,000", date: "2023/7/10" },
  { content: "7", team: "dtm班", price2: "¥10,000", date: "2023/6/6" },
  { content: "8", team: "dtm班", price2: "¥10,000", date: "2024/7/6" },
  { content: "9", team: "絵描き班", price2: "¥10,000", date: "2024/8/6" },
  { content: "10", team: "絵描き班", price2: "¥10,000", date: "2024/9/6" },
  { content: "11", team: "dtm班", price2: "¥10,000", date: "2023/10/7" },
  { content: "12", team: "dtm班", price2: "¥10,000", date: "2023/10/8" },
  { content: "13", team: "dtm班", price2: "¥10,000", date: "2023/10/9" },
  { content: "14", team: "dtm班", price2: "¥10,000", date: "2023/10/12" },
  { content: "15", team: "dtm班", price2: "¥10,000", date: "2028/10/14" },
  { content: "16", team: "dtm班", price2: "¥10,000", date: "2023/10/16" },
  { content: "17", team: "dtm班", price2: "¥10,000", date: "2021/10/16" },
  { content: "18", team: "dtm班", price2: "¥10,000", date: "2020/10/16" },
  { content: "19", team: "dtm班", price2: "¥10,000", date: "2013/10/16" },
  { content: "20", team: "dtm班", price2: "¥10,000", date: "2017/10/16" },
  { content: "21", team: "dtm班", price2: "¥10,000", date: "2033/10/16" },

  // 他のデータを追加する...
];

const Table: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1); // 現在のページ番号の状態管理
  const [rowsPerPage] = useState(10); // 1ページあたりの行数の状態管理
  const [startDate, setStartDate] = useState({ year: "", month: "", day: "" }); // 範囲開始日の日付の状態管理
  const [endDate, setEndDate] = useState({ year: "", month: "", day: "" }); // 範囲終了日の日付の状態管理
  const [sortOrder, setSortOrder] = useState<"asc" | "desc" | null>(null); // 日時の並び替え順序の状態管理
  const [selectedTeam, setSelectedTeam] = useState<string>("全て"); // 班名の選択状態管理
  const [filteredData, setFilteredData] = useState(data); // フィルタリングされたデータの状態管理
  const [shouldFilter, setShouldFilter] = useState(false); // フィルタリングを実行するかどうかの状態管理

  // 班名のオプションを定義
  const teams = ["全て", "it班", "ゲーム班", "絵描き班", "dtm班"];

  // データセット内の最も古い日時を取得
  const getEarliestDate = () => {
    return data.reduce((earliest, item) => {
      const itemDate = new Date(item.date);
      return itemDate < earliest ? itemDate : earliest;
    }, new Date(data[0].date));
  };

  // データセット内の最も未来の日時を取得
  const getLatestDate = () => {
    return data.reduce((latest, item) => {
      const itemDate = new Date(item.date);
      return itemDate > latest ? itemDate : latest;
    }, new Date(data[0].date));
  };

  // コンポーネントがマウントされたときにテキストをフォーマット
  useEffect(() => {
    const cells = document.querySelectorAll(".content");
    cells.forEach((cell) => {
      const text = cell.textContent || "";
      const formattedText = text.replace(/(.{30})/g, "$1\n");
      cell.textContent = formattedText;
    });
  }, [currentPage]);

  // データをフィルタリングおよびソート
  useEffect(() => {
    if (shouldFilter) {
      let filtered = [...data]; // データのコピーを作成

      // 班名のフィルタリング
      if (selectedTeam !== "全て") {
        filtered = filtered.filter((item) => item.team === selectedTeam);
      }

      // 日付範囲のフィルタリング
      const parseDate = (dateObj: { year: string; month: string; day: string }) => {
        const { year, month, day } = dateObj;
        return new Date(`${year}-${month}-${day}`);
      };

      const start = startDate.year && startDate.month && startDate.day ? parseDate(startDate) : getEarliestDate();
      const end = endDate.year && endDate.month && endDate.day ? parseDate(endDate) : getLatestDate();

      filtered = filtered.filter((item) => {
        const itemDate = new Date(item.date);
        return itemDate >= start && itemDate <= end;
      });

      // 日時のソート
      if (sortOrder !== null) {
        filtered = filtered.sort((a, b) => {
          const dateA = new Date(a.date).getTime();
          const dateB = new Date(b.date).getTime();
          return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
        });
      }

      setFilteredData(filtered);
      setShouldFilter(false); // フィルタリングをリセット
    }
  }, [shouldFilter, sortOrder, selectedTeam, startDate, endDate]);

  // ページネーションのためのデータの分割
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // 入力フィールドの値が変更されたときの処理
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setDate: React.Dispatch<React.SetStateAction<{ year: string; month: string; day: string }>>,
    field: string,
  ) => {
    const value = e.target.value;
    setDate((prevDate) => ({ ...prevDate, [field]: value }));
  };

  // 日時の並び替え順序を切り替える
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : sortOrder === "desc" ? null : "asc");
    setShouldFilter(true); // フィルタリングをトリガー
  };

  // 検索ボタンが押されたときの処理
  const handleSearch = () => {
    setShouldFilter(true); // フィルタリングをトリガー
  };

  // 班名の選択が変更されたときの処理
  const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam(e.target.value);
  };

  return (
    <div className="container">
      <h1>プラン一覧</h1>
      <div className="filters">
        <div className="date-picker-container">
          <span className="date-picker-label">範囲日時指定：</span>
          <div className="date-picker">
            <input
              type="text"
              placeholder="年"
              value={startDate.year}
              onChange={(e) => handleInputChange(e, setStartDate, "year")}
            />
            年
            <input
              type="text"
              placeholder="月"
              value={startDate.month}
              onChange={(e) => handleInputChange(e, setStartDate, "month")}
            />
            月
            <input
              type="text"
              placeholder="日"
              value={startDate.day}
              onChange={(e) => handleInputChange(e, setStartDate, "day")}
            />
            日<span className="tilde">〜</span>
            <input
              type="text"
              placeholder="年"
              value={endDate.year}
              onChange={(e) => handleInputChange(e, setEndDate, "year")}
            />
            年
            <input
              type="text"
              placeholder="月"
              value={endDate.month}
              onChange={(e) => handleInputChange(e, setEndDate, "month")}
            />
            月
            <input
              type="text"
              placeholder="日"
              value={endDate.day}
              onChange={(e) => handleInputChange(e, setEndDate, "day")}
            />
            日
          </div>
        </div>
        <div className="team-selector">
          <label htmlFor="team-select">班名選択：</label>
          <select id="team-select" value={selectedTeam} onChange={handleTeamChange}>
            {teams.map((team) => (
              <option key={team} value={team}>
                {team}
              </option>
            ))}
          </select>
          <button className="search-button" onClick={handleSearch}>
            検索
          </button>
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th className="header-content" scope="col">
              タイトル
            </th>
            <th className="header-team" scope="col">
              班名
            </th>
            <th className="header-price" scope="col">
              場所
            </th>
            <th className="header-date" scope="col">
              日時
              <button className="sort-button" onClick={toggleSortOrder}>
                {sortOrder === "asc" ? "▲" : sortOrder === "desc" ? "▼" : "■"}
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, index) => (
            <tr key={index}>
              <td className="content">{row.content}</td>
              <td data-label="team" className="team">
                {row.team}
              </td>
              <td data-label="price" className="price2">
                {row.price2}
              </td>
              <td data-label="date" className="date">
                {row.date}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
          &lt;
        </button>
        <span>
          {currentPage} of {totalPages}
        </span>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Table;
